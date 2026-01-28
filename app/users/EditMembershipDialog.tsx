import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addYears, addMonths, addDays, isEqual } from "date-fns";
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DialogClose } from "@radix-ui/react-dialog"
import { MembershipAPI } from "../actions/membership"
import { useRouter } from "next/navigation";


interface DialogProps {
    userId: number
    userName: string
    id: number
    createdAt: Date
    expiresAt: Date
}
export const EditMembershipDialog = (props: DialogProps) => {
    const [open, setOpen] = useState(false);
    const [tier, setTier] = useState("PREMIUM");
    const [years, setYears] = useState<string>("0")
    const [months, setMonths] = useState<string>("0")
    const [days, setDays] = useState<string>("0")
    const [error, setError] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState<string>("");
    const router = useRouter();
    const handleSubmit = async () => {
        setError(null);
        // submit values to api
        const expiry = new Date(props.expiresAt);
        let result = addYears(expiry, parseInt(years));
        result = addMonths(result, parseInt(months));
        result = addDays(result, parseInt(days));
        if(isEqual(result, expiry)) {
            setError("Expiration date is unchanged!");
            return;
        }
        const res = await MembershipAPI.updateMembership(props.id, {
            tier: tier,
            expiresAt: result,
        })  
        if(res.status >= 300) {
            setError(res.statusText);
            return;
        }
        // exit
        handleExit();
        return res;
    }
    const handleExit = () => {
        setTier("PREMIUM");
        setYears("0");
        setMonths("0");
        setDays("1");
        setOpen(false);
        router.refresh();
    }

    useEffect(() => {
        let diffMS = new Date(props.expiresAt).getTime() - Date.now()

        let totalDays = Math.floor(diffMS / 1000 / 60 / 60 / 24);
        console.log(totalDays);
        const diffYears = Math.floor(totalDays / 365);       // full years
        const remainingDaysAfterYears = totalDays % 365;

        const remainingMonths = Math.floor(remainingDaysAfterYears / 30); // approximate months
        const remainingDays = remainingDaysAfterYears % 30;
        setTimeLeft(`${diffYears} years, ${remainingMonths} months, ${remainingDays} days`);
    }, [])
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Edit for user...</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Edit membership for user {props.userId} ({props.userName}) </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Created at: {new Date(props.createdAt).toISOString()}<br/>
                    Expires at: {new Date(props.expiresAt).toISOString()}<br/>
                    Time left: {timeLeft}<br/>
                </DialogDescription>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name-1">Tier</Label>
                        <Select value={tier} onValueChange={setTier}>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Choose tier" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PREMIUM">Premium</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-4">
                        <Label htmlFor="name-1">Change by (+/-) </Label>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="grid gap-2">
                                <Label htmlFor="name-1">Years</Label>
                                <Input id="years" type="number"
                                name="years" defaultValue={years} onChange={(e) => setYears(e.target.value)}/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name-1">Months</Label>
                                <Input id="months" type="number" min="-11" max="11"
                                name="months" defaultValue={months} onChange={(e) => setMonths(e.target.value)}/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name-1">Days</Label>
                                <Input id="days" type="number" min="-29" max="29"
                                name="days" defaultValue={days} onChange={(e) => setDays(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-red-600">
                    {error}                
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Button onClick={() => handleSubmit()}
                    className="bg-green-600 hover:bg-green-500">
                        Create
                    </Button>
                    <DialogClose asChild>
                        <Button onClick={() => handleExit()}>
                            Exit
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}
