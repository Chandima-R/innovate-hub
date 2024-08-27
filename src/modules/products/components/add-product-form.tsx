"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDropzone, FileWithPath, Accept } from "react-dropzone"; // Import Accept
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

// form schema for add brand form
const FormSchema = z.object({
  brandName: z.string().min(2, {
    message: "Brand name must be at least 2 characters.",
  }),
  category: z.string().nonempty({
    message: "Please select a category.",
  }),
  image: z.any().optional(),
});

export const AddProductForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // form to add brand
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      brandName: "",
      category: "",
      image: null,
    },
  });

  const accept: Accept = {
    "image/*": [], // This tells dropzone to accept all image types
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop: (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        form.setValue("image", file);

        // Create a URL for the image and set it to state
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      }
    },
  });

  // submit function to add brand
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* form component to upload brand logo */}
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Brand Logo</FormLabel>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed border-gray-300 p-4 rounded-md relative ${
                  imagePreview ? "bg-cover bg-center h-32" : ""
                }`}
                style={{
                  backgroundImage: imagePreview
                    ? `url(${imagePreview})`
                    : "none",
                }}
              >
                <input {...getInputProps()} />
                {!imagePreview && (
                  <p className="text-center text-sm text-gray-500">
                    Drag &lsquo;n&rsquo; drop an image here, or click to select
                    one
                  </p>
                )}
                {imagePreview && (
                  <p className="absolute inset-0 flex items-center justify-center text-sm text-white bg-black bg-opacity-50 rounded-md">
                    Image Preview
                  </p>
                )}
              </div>
              {imagePreview && (
                <div className="text-xs">
                  Drag image to the image preview or click on it to upload new
                  image.
                </div>
              )}
              <FormDescription>
                Upload an image for your brand logo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* form component to add brand name */}
        <FormField
          control={form.control}
          name="brandName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Brand" {...field} />
              </FormControl>
              <FormDescription>Enter the name of your brand.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* form component to add brand category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Select the product category.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
