interface ZipFileEntry {
	name: string;
	data: Blob;
}

const crcTable = new Uint32Array(256);

for (let i = 0; i < 256; i++) {
	let c = i;

	for (let j = 0; j < 8; j++) {
		c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
	}

	crcTable[i] = c;
}

async function calculateCrc32(stream: ReadableStream<Uint8Array>) {
	const reader = stream.getReader();
	let crc = 0xffffffff;

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		for (let i = 0; i < value.length; i++) {
			crc = (crc >>> 8) ^ crcTable[(crc ^ value[i]) & 0xff];
		}
	}

	return (crc ^ 0xffffffff) >>> 0;
}

export async function zip(files: ZipFileEntry[]) {
	const encoder = new TextEncoder();
	const parts = [];
	const centralDirectory = [];

	let offset = 0;

	const now = new Date();
	const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
	const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();

	for (const file of files) {
		const fileNameBytes = encoder.encode(file.name);

		const [crcStream, compressionStream] = file.data.stream().tee();

		const [crc, compressedBlob] = await Promise.all([
			calculateCrc32(crcStream),
			new Response(compressionStream.pipeThrough(new CompressionStream('deflate-raw'))).blob()
		]);

		const compressedSize = compressedBlob.size;
		const uncompressedSize = file.data.size;

		// Local File Header
		const headerSize = 30 + fileNameBytes.byteLength;
		const headerBuffer = new ArrayBuffer(headerSize);
		const header = new DataView(headerBuffer);

		header.setUint32(0, 0x04034b50, true); // Signature
		header.setUint16(4, 0x0014, true); // Version (2.0)
		header.setUint16(6, 0x0000, true); // Flags
		header.setUint16(8, 0x0008, true); // Compression method (8 = Deflate)
		header.setUint16(10, dosTime, true);
		header.setUint16(12, dosDate, true);
		header.setUint32(14, crc, true);
		header.setUint32(18, compressedSize, true);
		header.setUint32(22, uncompressedSize, true);
		header.setUint16(26, fileNameBytes.byteLength, true);
		header.setUint16(28, 0, true); // Extra field length

		new Uint8Array(headerBuffer, 30).set(fileNameBytes);

		parts.push(headerBuffer);
		parts.push(compressedBlob);

		// Central Directory Header
		const cdHeaderSize = 46 + fileNameBytes.byteLength;
		const cdBuffer = new ArrayBuffer(cdHeaderSize);
		const cd = new DataView(cdBuffer);

		cd.setUint32(0, 0x02014b50, true); // Signature
		cd.setUint16(4, 0x0014, true); // Version made by
		cd.setUint16(6, 0x0014, true); // Version needed
		cd.setUint16(8, 0x0000, true); // Flags
		cd.setUint16(10, 0x0008, true); // Compression method
		cd.setUint16(12, dosTime, true);
		cd.setUint16(14, dosDate, true);
		cd.setUint32(16, crc, true);
		cd.setUint32(20, compressedSize, true);
		cd.setUint32(24, uncompressedSize, true);
		cd.setUint16(28, fileNameBytes.byteLength, true);
		cd.setUint16(30, 0, true); // Extra field
		cd.setUint16(32, 0, true); // Comment
		cd.setUint16(34, 0, true); // Disk num
		cd.setUint16(36, 0, true); // Internal attrs
		cd.setUint32(38, 0, true); // External attrs
		cd.setUint32(42, offset, true); // Offset of local header

		new Uint8Array(cdBuffer, 46).set(fileNameBytes);
		centralDirectory.push(cdBuffer);

		offset += headerSize + compressedSize;
	}

	// End of Central Directory Record
	const cdSize = centralDirectory.reduce((acc, buf) => acc + buf.byteLength, 0);

	const eocdBuffer = new ArrayBuffer(22);
	const eocd = new DataView(eocdBuffer);

	eocd.setUint32(0, 0x06054b50, true);
	eocd.setUint16(4, 0, true);
	eocd.setUint16(6, 0, true);
	eocd.setUint16(8, files.length, true);
	eocd.setUint16(10, files.length, true);
	eocd.setUint32(12, cdSize, true);
	eocd.setUint32(16, offset, true);
	eocd.setUint16(20, 0, true);

	return new Blob([...parts, ...centralDirectory, eocdBuffer], { type: 'application/zip' });
}
