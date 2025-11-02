export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="bg-yellow-100 text-black font-semibold text-center py-3 text-lg shadow-sm">
      {title}
    </div>
  );
}
