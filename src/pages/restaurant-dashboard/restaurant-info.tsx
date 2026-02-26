
import React, {useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {Input} from "#/components/ui/input";
import {Label} from "#/components/ui/label";
import {Button} from "#/components/ui/button";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "#/components/ui/dialog";
import equal from "fast-deep-equal";

import {Separator} from "#/components/ui/separator";
import useStore from "../../store";
import {fetcher} from "../../utils/fetcher";
import {Download} from "lucide-react";

const RestaurantPage = () => {
  const {restaurant, setRestaurant} = useStore();
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = (data: any) => {
    console.log("Restaurant form submitted:", data);
    fetcher('/admin/dashboard/restaurant/update', {method: "PUT", body: JSON.stringify(data)})
      .then(
        () => {
          setRestaurant({
            ...restaurant,
            ...data
          })
        },
        () => {}
      )
    // Send to API or handle logic
    setOpen(false); // Close modal after submission
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <div className="space-y-6">
        <div className="flex justify-between items-center">

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Restaurant</DialogTitle>
            </DialogHeader>

            <RestaurantForm defaultValues={restaurant} onSubmit={handleSubmit} />

            <DialogFooter>
              {/* You can put extra action buttons here if needed */}
            </DialogFooter>
          </DialogContent>

        </div>
        {/*
          <DialogTrigger asChild>
            <Button variant={"outline"} className="ms-auto">Edit Restaurant</Button>
          </DialogTrigger> */}
        <RestaurantInfo restaurant={restaurant} />

      </div >
    </Dialog>
  );
};

export default RestaurantPage;

type RestaurantFormData = {
  id?: number;
  name: string;
  address: string;
  qrCodeURL?: string;
  urlPath?: string;
};

type Props = {
  defaultValues?: RestaurantFormData;
  onSubmit: (data: RestaurantFormData) => void;
};

const RestaurantForm: React.FC<Props> = ({defaultValues, onSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<RestaurantFormData>({defaultValues});

  const isChanged = useMemo(() => {
    return !equal(watch(), defaultValues);
  }, [watch()])


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <div className="space-y-1">
          <Label htmlFor="name">Restaurant Name</Label>
          <Input
            id="name"
            {...register("name", {required: "Restaurant name is required"})}
            placeholder="Enter restaurant name"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            {...register("address", {required: "Address is required"})}
            placeholder="Enter address"
          />
          {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
        </div>


        <Button type="submit" className="w-full" disabled={!isChanged}>
          Save
        </Button>
      </form>
    </ >
  );
};

type RestaurantInfoProps = {
  restaurant: {
    id?: number;
    name: string;
    address: string;
    qrCodeURL?: string;
    urlPath?: string;
    createdAt?: string;
    updatedAt?: string;
  };
};

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({restaurant}) => {

  const handleDownloadImage = () => {
    let imageUrl = restaurant.qrCodeURL as string;

    if (!imageUrl) return;

    // Add fl_attachment dynamically
    const downloadUrl = imageUrl.replace(
      "/upload/",
      "/upload/fl_attachment/"
    );

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  console.log(restaurant.qrCodeURL, 'url --------')

  return (
    <>

      <div className=" flex">
        <h2 className="text-2xl font-bold">{restaurant.name}</h2>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="ms-auto">Edit Restaurant</Button>
        </DialogTrigger>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
        <p>{restaurant.address}</p>
      </div>

      {
        restaurant.qrCodeURL && (
          <div className="relative" >
            <Button
              title="download qr code image"
              variant="outline"
              size="icon"
              onClick={handleDownloadImage}
              className="absolute top-10 left-4"
            >
              <Download className="h-4 w-4" />
            </Button>

            <h4 className="text-sm font-medium text-muted-foreground mb-2">QR Code</h4>
            <img
              title="download qr code"
              onClick={handleDownloadImage}
              src={restaurant.qrCodeURL}
              alt="QR Code"
              className=" object-contain border rounded max-h-[400px] cursor-pointer"
            />
          </div>
        )
      }

      <Separator />

      <div className="text-sm text-muted-foreground">
        <p>Created: {restaurant.createdAt ? new Date(restaurant.createdAt).toLocaleString() : "—"}</p>
        <p>Updated: {restaurant.updatedAt ? new Date(restaurant.updatedAt).toLocaleString() : "—"}</p>
      </div>
    </>
  );
};

