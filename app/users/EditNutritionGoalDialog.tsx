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
    userId: number
    userName: string
    id: number
    calories: number
    carbohydrates: number
    protein: number
    fat: number
}
export const EditNutritionGoalDialog = (props: DialogProps) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [calories, setCalories] = useState<string>(props.calories.toString());
    const [carbohydrates, setCarbohydrates] = useState<string>(props.carbohydrates.toString());
    const [protein, setProtein] = useState<string>(props.protein.toString());
    const [fat, setFat] = useState<string>(props.fat.toString());
    const router = useRouter();

    const handleSubmit = async () => {
        setError(null);
        // submit values to api
        
        if(!calories || !carbohydrates || !protein || !fat) {
            setError("One or more fields are not set!");
            return;
        }
        try {
            const res = await NutritionGoalAPI.updateNutritionGoal(props.id, {
                calories_kcal: parseInt(calories),
                carbohydrates_g: parseInt(carbohydrates),
                protein_g: parseInt(protein),
                fat_g: parseInt(fat),
            })  
            console.log(res);
            if(res.status >= 300) {
                setError(res.statusText);
                return;
            }
            // exit
            handleExit();
        }
        catch (e: any) {
            setError(e?.response?.data?.message ?? e.message ?? "Failed to edit goal");
        }
    }
    const handleExit = () => {
        setOpen(false);
        setError(null);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Edit for user...</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Edit nutrition goal for user {props.userId} ({props.userName}) </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">Calories (kcal)</Label>
                      <Input id="calories" name="calories" placeholder="Enter calorie amount..."
                      defaultValue={calories}
                      type="number" min="0"
                      onChange={(e) => setCalories(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">Carbohydrates (grams)</Label>
                      <Input id="carbohydrates" name="carbohydrates" placeholder="Enter carbohydrate amount..."
                      defaultValue={carbohydrates}
                      type="number" min="0"
                      onChange={(e) => setCarbohydrates(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">Fat (grams)</Label>
                      <Input id="fat" name="fat" placeholder="Enter fat amount..."
                      defaultValue={fat}
                      type="number" min="0" 
                      onChange={(e) => setFat(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">Protein (grams)</Label>
                      <Input id="protein" name="protein" placeholder="Enter fat amount..."
                      defaultValue={protein}
                      type="number" min="0"
                      onChange={(e) => setProtein(e.target.value)}
                      />
                    </div>
                </div>
                <div className="text-red-600">
                    {error}                
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Button onClick={() => handleSubmit()}
                    className="bg-green-600 hover:bg-green-500">
                        Edit
                    </Button>
                    <DialogClose asChild>
                        <Button onClick={() => handleExit()}>
                           Close 
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}
