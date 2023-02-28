import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type UseFormProps } from "react-hook-form";
import { api } from "src/utils/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const createWatchPartySchema = z.object({
  title: z.string(),
  location: z.string(),
  time: z.date(),
  cost: z.number(),
});

const useZodForm = <TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) => {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });

  return form;
};

const WatchParty = () => {
  const mutation = api.watchParty.create.useMutation();

  const { register, control, handleSubmit } = useZodForm({
    schema: createWatchPartySchema,
    defaultValues: {
      title: "",
      location: "",
      time: new Date(),
    },
  });

  return (
    <div className="my-10 flex flex-col items-center justify-center">
      <h1 className="text-6xl">WatchParty</h1>
      <form
        className="mt-4 space-y-2"
        onSubmit={(e) => {
          handleSubmit((values) => {
            mutation.mutate(values);
          })(e).catch(() => {
            console.log(e);
          });
        }}
      >
        <div className="">
          <label>
            Title <br />
            <input className="border border-black" {...register("title")} />
          </label>
        </div>
        <div className="">
          <label>
            Location <br />
            <input className="border border-black" {...register("location")} />
          </label>
        </div>
        <div className="">
          <label>
            Cost <br />
            <input
              className="border border-black"
              type="number"
              {...register("cost", { valueAsNumber: true })}
            />
          </label>
        </div>
        <div className="">
          <label>
            Date <br />
            <Controller
              control={control}
              name="time"
              render={({ field }) => (
                <DatePicker
                  minDate={new Date()}
                  minTime={new Date()}
                  maxTime={new Date(new Date().setHours(23, 59, 59, 999))}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  selected={field.value}
                  onChange={field.onChange}
                  placeholderText={new Date().toLocaleDateString()}
                  className="border border-black"
                  showTimeSelect
                  timeFormat="HH:mm"
                />
              )}
            />
          </label>
          <button type="submit" className="mt-4 border">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default WatchParty;
