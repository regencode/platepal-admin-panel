import { redirect } from "next/navigation";
import { refresh } from "./actions/auth";
import ClientView from "./ClientView";

export default async function Home() {
    return (
        <ClientView />
    );
}
