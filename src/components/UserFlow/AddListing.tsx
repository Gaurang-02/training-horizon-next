"use client"

import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from 'axios'
import { z } from "zod"
import { v4 as uuidv4 } from 'uuid';


import { Button } from "@/components/trainer-dashboard/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/trainer-dashboard/ui/form"
import { Input } from "@/components/trainer-dashboard/ui/input"
import { FormEventHandler, useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/trainer-dashboard/ui/select";



export function AddListing() {
    
const categories = ["Basketball", "Table Tennis", "Yoga", "Other"] as const
const gender = ["Male", "Female", "Other"] as const
const agegroup = ["5-8", "8-12" ,"13-18", "18-21", "21+"] as const

const formSchema = z.object({
    category: z.string(),
    title: z.string().min(3, {
        message: "Enter atleast 3 character"
    }),
    price: z.string().min(1, {
        message: "Please enter price"
    }),
    location: z.string().min(3, {
        message: "Please enter a valid location address."
    }),
    quantity: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    days: z.string().min(1, {
        message: "Please enter number of days"
    }),

    gender: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    ageGroup: z.string(),
    description: z.string().min(5, {
        message: "Please enter description"
    })
})

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            price: "",
            location: "",
            quantity: "",
            startDate: "",
            endDate: "",
            days: "",
            startTime: "",
            endTime: "",
        },
    })

    const [newListingValue, setNewListingValue] = useState('');

    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      // Retrieve existing listings from local storage
      const existingListings = JSON.parse(localStorage.getItem('listings') || '[]');
  
      // Add the new listing
      const updatedListings = [...existingListings, values];
  
        // post listing to server
        try {
            const response = await axios.post('http://localhost:3005/api/v1/listing/add-listing', values, {
              headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmQxZDM0MWQ1YTcyMGU5MGFlYTJiNjQiLCJpYXQiOjE3MjUwMjcxMzd9.hgARNbf2gVSkPVbRiglOrAoTRSSTeayjVrCqg1KhwCI`,
                'Content-Type': 'application/json',
              },
            });
        
            return response.data;
          } catch (error) {
            console.error('Error posting data:', error);
            throw error;
          }

      // Store updated listings back in local storage
      localStorage.setItem('listings', JSON.stringify(updatedListings));
  
      // Redirect to the listings page
      router.push('/dashboard/teacher/show_all_listings');
  };
  

    return (
        <div className="m-4">
            <div className="text-xl font-bold">Add Listing</div>
        <Form{...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-4 space-y-2">
                <FormField
                    name="category"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CATEGORY</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Categories</SelectLabel>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>TITLE</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="price"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>PRICE</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="location"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>LOCATION</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="quantity"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>QUANTITY (OPTIONAL)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="startDate"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>START DATE (OPTIONAL)</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="endDate"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>END DATE (OPTIONAL)</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="days"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>DAYS</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="gender"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>GENDER</FormLabel>
                            <FormControl>
                            <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Gender</SelectLabel>
                                            {gender.map((gender) => (
                                                <SelectItem key={gender} value={gender}>
                                                    {gender}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="startTime"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>START TIME</FormLabel>
                            <FormControl>
                                <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="endTime"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>END TIME (OPTIONAL)</FormLabel>
                            <FormControl>
                                <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="ageGroup"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>AGE GROUP</FormLabel>
                            <FormControl>
                            <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select age group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Age Group</SelectLabel>
                                            {agegroup.map((agegroup) => (
                                                <SelectItem key={agegroup} value={agegroup}>
                                                    {agegroup}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>DESCRIPTION</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit Lisitng</Button>
            </form>
        </Form>
        </div>
    )
}