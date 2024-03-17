import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Transaction, transactionSchema } from "@/schemas/transaction.schema";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import {
 broadcastTransaction,
 checkStatusTransaction,
} from "@/services/transaction.service";
import React from "react";
import { TRANSACTION_STATUS } from "@/interface/transaction.interface";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheckBig, Loader } from "lucide-react";

const BroadcastForm = () => {
 const [txHash, setTxHash] = React.useState("");
 const [status, setStatus] = React.useState<TRANSACTION_STATUS>();
 const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout>();

 const form = useForm<Transaction>({
  resolver: zodResolver(transactionSchema),
  defaultValues: {
   symbol: "",
   price: 1,
   timestamp: new Date().getTime(),
  },
 });

 const onSubmit = async (data: Transaction) => {
  const response = await broadcastTransaction(data);
  if (!response) return;
  setTxHash(response.tx_hash);

  const id = setInterval(async () => {
   const data = await checkStatusTransaction(response.tx_hash);
   if (!data) return;
   setStatus(data.tx_status);
  }, 1000);

  setIntervalId(id);
 };

 React.useEffect(() => {
    if (status == "CONFIRMED" || status == "FAILED") {
        clearInterval(intervalId)
    }
 }, [status, intervalId])

 return (
  <>
   {status && (status != "PENDING") && (
    <Alert variant={status == "FAILED" ? "destructive" : status == "CONFIRMED" ? "success" : "default"}>
     <CircleCheckBig className="h-4 w-4" />
     <AlertTitle>{status}</AlertTitle>
     <AlertDescription>
        {status == "CONFIRMED" && "Transaction has been processed and confirmed"}
        {status == "FAILED" && "Transaction failed to process"}
        {status == "DNE" && "Transaction does not exist"}
     </AlertDescription>
    </Alert>
   )}
   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
     <div className="flex flex-col gap-3">
      <h4 className="font-bold">Broadcast Transaction:</h4>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 flex-wrap">
       <FormField
        control={form.control}
        name="symbol"
        render={({ field }) => (
         <FormItem className="flex flex-col items-center gap-2 justify-start">
          <div className="flex items-center gap-2 w-full">
           <FormLabel>Symbol: </FormLabel>
           <FormControl>
            <Input {...field} placeholder="symbol" />
           </FormControl>
          </div>

          <FormMessage className="text-xs font-light w-full" />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
         <FormItem className="flex flex-col items-center gap-2 w-full">
          <div className="flex items-center gap-2 w-full">
           <FormLabel>Price: </FormLabel>
           <FormControl>
            <Input {...field} placeholder="price" type="number" min={1} />
           </FormControl>
          </div>
          <FormMessage className="text-xs font-light w-full" />
         </FormItem>
        )}
       />
      </div>
      <div className="flex gap-2 items-center flex-wrap">
       <div>
        <Button disabled={status == "PENDING"}>
            {status != "PENDING" && "broadcast"}
            {status == "PENDING" &&
                <>
                    <Loader className="animate-spin"/>&nbsp;pending
                </>
            }
        </Button>
       </div>
       {txHash && <div className="text-sm">tx_hash: {txHash}</div>}
      </div>
     </div>
    </form>
   </Form>
  </>
 );
};

export default BroadcastForm;
