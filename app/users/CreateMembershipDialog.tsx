import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
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
import type { Membership } from "../memberships/columns"
import { DialogClose } from "@radix-ui/react-dialog"
import { DropdownMenu } from "@/components/ui/dropdown-menu"

enum MembershipTier {
    PREMIUM
}

interface DialogProps {
    userId: number
    userName: string
    tier: MembershipTier
    expiresAt: Date
}
export const CreateMembershipDialog = (props: DialogProps) => {
    const [open, setOpen] = useState(false);
    const [tier, setTier] = useState("PREMIUM");
    const [years, setYears] = useState<string>("0")
    const [months, setMonths] = useState<string>("0")
    const [days, setDays] = useState<string>("1")
    const handleSubmit = () => {
        // submit values to api
        
        // exit
        handleExit();
    }
    const handleExit = () => {
        setTier("PREMIUM");
        setYears("0");
        setMonths("0");
        setDays("1");
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create for user...</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create membership for user {props.userId} ({props.userName}) </DialogTitle>
                </DialogHeader>
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
                        <Label htmlFor="name-1">Expires in </Label>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="grid gap-2">
                                <Label htmlFor="name-1">Years</Label>
                                <Input id="years" type="number" min="0"
                                name="years" defaultValue={years} onChange={(e) => setYears(e.target.value)}/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name-1">Months</Label>
                                <Input id="months" type="number" min="0"
                                name="months" defaultValue={months} onChange={(e) => setMonths(e.target.value)}/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name-1">Days</Label>
                                <Input id="days" type="number" min="0"
                                name="days" defaultValue={days} onChange={(e) => setDays(e.target.value)}/>
                            </div>
                        </div>
                    </div>
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
