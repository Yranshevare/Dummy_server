import Builder from "@/module/method/route/edit/ui/page";

export default function Page({ params }: { params: Promise<{ method: string; route: string }> }) {
    return <Builder params={params} />;
}
