"use client"

import BroadcastForm from "@/components/home/form/BroadcastForm";
import CheckStatusForm from "@/components/home/form/CheckStatusForm";

export default function Home() {
 return (
  <div className="p-10 flex flex-col gap-5">
    <BroadcastForm />
    <CheckStatusForm />
  </div>
 );
}
