async function getData(companyName: string) {
  const res = await fetch(`https://api.example.com/companies/${companyName}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { name: string } }) {
  const data = await getData(params.name);

  return (
    <div>
      <h1>{data.companyName}</h1>
      <p>{data.description}</p>
      {/* Render other company details as needed */}
    </div>
  );
}
