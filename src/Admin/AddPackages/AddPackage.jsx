import React from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const AddPackage = () => {
  const { user } = useAuth();
  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      tourPlan: [{ day: "", description: "" }]
    }
  });

  const axiosSecure = useAxiosSecure();
  const { fields, append, remove } = useFieldArray({ control, name: "tourPlan" });
  const selectedTourType = watch("tourType");

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let i = 0; i < data.photos.length; i++) {
      formData.append('photos', data.photos[i]);
    }

    formData.append('tourType', data.tourType);
    formData.append('price', data.price);
    formData.append('info', data.info);
    formData.append('email', user.email);
    formData.append('tourPlan', JSON.stringify(data.tourPlan));

    try {
      const res = await axiosSecure.post('/addPackage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.insertedId) {
        Swal.fire({
          text: "Tour package is added successfully",
          icon: "success",
          timer: 1500
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 max-w-2xl mx-auto">

      <div className="form-control">
        <label className="label font-semibold">Tour Images</label>
        <input
          {...register("photos")}
          type="file"
          multiple
          accept="image/*"
          className="file-input file-input-bordered w-full"
        />
      </div>

      <div className="form-control">
        <label className="label font-semibold">Tour Type</label>
        <select {...register("tourType")} className="select select-bordered w-full">
          <option value="">Select Tour Type</option>
          <option value="adventure">Adventure</option>
          <option value="romantic">Romantic</option>
          <option value="family">Family</option>
          <option value="historical">Historical</option>
        </select>
        {selectedTourType === "adventure" && (
          <p className="text-info mt-2">Get ready for an exciting adventure tour!</p>
        )}
      </div>

      <div className="form-control">
        <label className="label font-semibold">Price (USD)</label>
        <input
          {...register("price", { required: true })}
          type="number"
          className="input input-bordered w-full"
          placeholder="Enter Tour Price"
        />
      </div>

      <div className="form-control">
        <label className="label font-semibold">Tour Information</label>
        <textarea
          {...register("info")}
          className="textarea textarea-bordered w-full"
          placeholder="Enter detailed tour information"
        />
      </div>

      <div className="form-control">
        <label className="label font-semibold">Day-wise Tour Plan</label>
        <div className="space-y-2">
          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-2 items-center">
              <input
                {...register(`tourPlan[${index}].day`)}
                placeholder="Day X"
                className="input input-bordered w-1/3"
              />
              <input
                {...register(`tourPlan[${index}].description`)}
                placeholder="Description"
                className="input input-bordered w-2/3"
              />
              <button type="button" onClick={() => remove(index)} className="btn btn-error btn-sm">X</button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => append({ day: "", description: "" })} className="btn btn-outline mt-2">
          + Add Day
        </button>
      </div>

      <button type="submit" className="btn btn-primary w-full">Submit Tour Package</button>
    </form>
  );
};

export default AddPackage;
