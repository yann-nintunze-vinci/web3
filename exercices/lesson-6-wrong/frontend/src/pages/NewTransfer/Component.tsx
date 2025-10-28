import { useLoaderData, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ApiClient } from "@/lib/api";
import { ArrowRightLeft, EuroIcon, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { LoaderData } from "./loader";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useAsyncOperation } from "@/hooks/useAsyncOperation";

const transferSchema = z.object({
  sourceId: z.string().min(1, "Source is required"),
  targetId: z.string().min(1, "Target is required"),
  amount: z.coerce.number<number>().min(0.01, "Amount must be greater than 0"),
});

type TransferFormData = z.infer<typeof transferSchema>;

export default function TransferForm() {
  const { user } = useAuth();
  const { users } = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const currentUser = users.find((u) => u.id == user?.userId);
  const otherUsers = users.filter((u) => u.id !== user?.userId);
  const { execute, isLoading } = useAsyncOperation<void>();

  const form = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      sourceId: user?.userId.toString() || "",
      targetId: "",
      amount: 0,
    },
  });

  const onSubmit = async (data: TransferFormData) => {
    await execute(async () => {
      await ApiClient.createTransfer({
        amount: data.amount,
        sourceId: Number(data.sourceId),
        targetId: Number(data.targetId),
      });
      toast.success("Transfer has been created.");
      return navigate("/transactions");
    });
  };

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">New Transfer</h1>
        <p className="text-muted-foreground">Send money between users</p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          {/* Error Message */}
          {form.formState.errors.root && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
              <p className="text-destructive text-sm">
                {form.formState.errors.root.message}
              </p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="sourceId"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        From
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {currentUser?.name ?? "Unknown user"}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center mb-6">
                  <div className="bg-chart-2/10 p-3 rounded-lg">
                    <ArrowRightLeft className="w-6 h-6 text-chart-2" />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="targetId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        To
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select recipient" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {otherUsers.map((user) => (
                            <SelectItem
                              key={user.id}
                              value={user.id.toString()}
                            >
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                {user.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Amount Input */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Amount
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <EuroIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          className="pl-9"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ArrowRightLeft className="w-4 h-4" />
                    Create Transfer
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
