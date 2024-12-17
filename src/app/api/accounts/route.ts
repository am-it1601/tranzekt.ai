import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/data.json');

const readData = () => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeData = (data: any) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const data = readData();
    if (id) {
        const account = data.find((item: any) => item.id === parseInt(id));
        return new Response(JSON.stringify(account || {}), { status: 200 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req: Request) {
    const body = await req.json();
    const data = readData();

    const newAccount = { id: Date.now(), ...body };
    data.push(newAccount);

    writeData(data);

    return new Response(JSON.stringify(newAccount), { status: 201 });
}




