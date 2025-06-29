import type {ColumnDef} from '@tanstack/react-table';
import {z} from 'zod';
import {DataTable, DragHandle} from './data-table';

import {
  CheckCircle2Icon
} from 'lucide-react';

import {Badge} from '#/components/ui/badge';
import {Checkbox} from '#/components/ui/checkbox';
import {Dish_Categories} from '../utils/constants';


export const schema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  categories: z.array(z.string()),
  preparationTime: z.string(),
  price: z.number(),
  displayPrice: z.number(),
  veg: z.boolean(),
  bestSeller: z.boolean(),
  images: z.object({
    url: z.string(),
    name: z.string(),
    folder: z.string(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
})
type SchemaType = z.infer<typeof schema>;

// Create a separate component for the drag handle
const columns: ColumnDef<SchemaType>[] = [
  {
    id: 'drag',
    header: () => null,
    cell: ({row}) => <DragHandle id={row.original.id} />,
  },
  {
    id: 'select',
    header: ({table}) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({row}) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({row}) => {
      return <div>{row.original.name}</div>
    },
    enableHiding: false,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({row}) => (
      <div
        className="px-1.5 text-muted-foreground w-32 border border-gray-100 rounded-lg line-clamp-2"
      >
        {row.original.description}
      </div>
    )
  },
  {
    accessorKey: 'veg',
    header: 'Veg',
    cell: ({row}) => (
      <Badge variant="outline" className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3">
        {row.original.veg ? (
          <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
        ) : (
          <CheckCircle2Icon className="text-red-500 dark:text-red-400" />
        )}
        {`${row.original.veg}`}
      </Badge>
    ),
  },
  {
    accessorKey: 'bestSelling',
    header: () => <div className='text-nowrap'>Best Selling</div>,
    cell: ({row}) => (
      <Badge variant="outline" className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3">
        {row.original.veg ? (
          <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
        ) : (
          <CheckCircle2Icon className="text-red-500 dark:text-red-400" />
        )}
        {`${row.original.veg}`}
      </Badge>
    ),
  },
  {
    accessorKey: 'price',
    header: () => <div className="w-full">Price</div>,
    cell: ({row}) => (
      <p>
        ₹{row.original.price}
      </p>
    ),
  },
  {
    accessorKey: 'displayPrice',
    header: () => <div className="text-nowrap">Display Price</div>,
    cell: ({row}) => (
      <p>
        ₹{row.original.displayPrice}
      </p>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({row}) => {
      return row.original.categories?.map((cate: string) => {
        let cateObj = Dish_Categories.find((cateObj) => {
          if (cateObj.value === cate) {
            return true
          } else {
            return false
          }
        })
        return <div className=' text-muted-foreground ' key={cateObj?.value}>{cateObj?.label}, </div>
      })
    }
  },
  // {
  //   id: 'actions',
  //   cell: () => (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger asChild>
  //         <Button
  //           variant="ghost"
  //           className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
  //           size="icon"
  //         >
  //           <MoreVerticalIcon />
  //           <span className="sr-only">Open menu</span>
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent align="end" className="w-32">
  //         <DropdownMenuItem>Edit</DropdownMenuItem>
  //         <DropdownMenuItem>Make a copy</DropdownMenuItem>
  //         <DropdownMenuItem>Favorite</DropdownMenuItem>
  //         <DropdownMenuSeparator />
  //         <DropdownMenuItem>Delete</DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   ),
  // },
];

export function DishesDataTable({
  data: initialData,
}: {
  data: SchemaType[]
}) {

  return (
    <DataTable<SchemaType> data={initialData} columns={columns} />

  )
}
