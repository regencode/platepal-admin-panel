import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState } from "react"
import { NutritionGoalAPI } from "../actions/nutritionGoal"
import { useRouter } from "next/navigation"

interface DialogProps {
    id: number
    userId: number
    userName: string
}
export const DeleteNutritionGoalDialog = (props: DialogProps) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async () => {
        setError(null);
        // submit values to api
        try {
            const res = await NutritionGoalAPI.deleteNutritionGoal(props.id);
            console.log(res);
            if(res.status >= 300) {
                setError(res.statusText);
                return;
            }
            // exit
            handleExit();
        }
        catch (e: any) {
            setError(e?.response?.data?.message ?? e.message ?? "Failed to delete goal");
        }
    }
    const handleExit = () => {
        setOpen(false);
        setError(null);
        router.refresh();
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-red-600 text-white">Delete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Delete nutrition goal for user {props.userId} ({props.userName}) </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete nutrition goal for user {props.userId} ({props.userName})?
                    This action is irreversible!
                </DialogDescription>
                <div className="text-red-600">
                    {error}                
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Button onClick={() => handleSubmit()}
                    className="bg-red-600 hover:bg-red-500">
                        Delete
                    </Button>
                    <DialogClose asChild>
                        <Button onClick={() => handleExit()}>
                            Cancel
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}
