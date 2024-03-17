import { Button } from "@/components/ui/button";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
 BroadcastResponse,
 broadcastResponseSchema,
} from "@/schemas/transaction.schema";
import { checkStatusTransaction } from "@/services/transaction.service";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const CheckStatusForm = () => {
 const [message, setMessage] = React.useState("")

 const form = useForm<BroadcastResponse>({
  resolver: zodResolver(broadcastResponseSchema),
  defaultValues: {
   tx_hash: "",
  },
 });

 const onSubmit = async (data: BroadcastResponse) => {
  const response = await checkStatusTransaction(data.tx_hash);
  if (!response) return;
  setMessage(response.tx_status)
 };

 return (
  <Form {...form}>
   <form onSubmit={form.handleSubmit(onSubmit)}>
    <div className="flex flex-col gap-3">
     <h4 className="font-bold">Check Status Transaction:</h4>
     <FormField
      control={form.control}
      name="tx_hash"
      render={({ field }) => (
       <FormItem className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
         <FormLabel className="whitespace-nowrap">Tx Hash: </FormLabel>
         <FormControl>
          <Input {...field} placeholder="tx hash" />
         </FormControl>
        </div>
        <FormMessage className="text-xs font-light w-full" />
       </FormItem>
      )}
     />
     <div className="flex gap-2 items-center flex-wrap">
      <Button>check</Button>
      <div className="text-sm">{message}</div>
     </div>
    </div>
   </form>
  </Form>
 );
};

export default CheckStatusForm;
