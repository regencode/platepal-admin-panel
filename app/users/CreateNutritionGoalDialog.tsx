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
import type { NutritionGoal } from "./columns"
import { DialogClose } from "@radix-ui/react-dialog"

interface DialogProps {
    userId: number
    userName: string
    calories_kcal: number
    carbohydrates_g: number
    protein_g: number
    fat_g: number
}
export const CreateNutritionGoalDialog = (props: DialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create for user...</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create nutrition goal for user {props.userId} ({props.userName}) </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">Calories (kcal)</Label>
                      <Input id="calories" name="calories" defaultValue="2000" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">Carbohydrates (grams)</Label>
                      <Input id="carbohydrates" name="carbohydrates" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">Fat (grams)</Label>
                      <Input id="fat" name="fat"  />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">Protein (grams)</Label>
                      <Input id="protein" name="protein"  />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Button className="bg-green-600 hover:bg-green-500">
                        Create
                    </Button>
                    <DialogClose asChild>
                        <Button>
                            Exit
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}
