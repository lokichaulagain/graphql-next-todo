import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UPDATE_TODO } from "../../graphql/Mutation";
import { GET_TODO } from "../../graphql/Query";

export default function Id() {
  const router = useRouter();
  const id = router.query.id;

  const { loading, error, data } = useQuery(GET_TODO, {
    variables: {
      id: `${id}`,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const handleAllField = watch();
  console.log(handleAllField);

  const [updateTodo] = useMutation(UPDATE_TODO);
  const editTodo = async () => {
    updateTodo({
      variables: {
        title: data.title,
        detail: data.detail,
        date: data.date,
      },
      refetchQueries: [{ query: GET_TODO }],
    });
    reset();
  };

  return (
    <div className="container mt-5 pt-5">
      <Link href={"/"}>
        <button
          type="button"
          className="btn btn-dark py-0 px-3 rounded-0 mb-3">
          Back
        </button>
      </Link>
      {data && (
        <form
          onSubmit={handleSubmit(editTodo)}
          id="edit"
          tab-index="-1"
          aria-labelledby="editLabel"
          aria-hidden="true">
          <div className=" ">
            <div className=" rounded-0 border-0">
              <div className="">
                <h1
                  className=" fs-5 "
                  id="editLabel">
                  Edit Your Todo
                </h1>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="title"
                    className="form-label mb-1 h6 ">
                    Title{" "}
                  </label>
                  <input
                    defaultValue={data.getTodo.title}
                    type="text"
                    className="form-control rounded-0 py-2"
                    id="title"
                    {...register("title", { required: true })}
                  />
                  {errors.title && <span className="text-danger fw-semibold">This field is required</span>}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="detail"
                    className="form-label mb-1 h6 ">
                    Detail{" "}
                  </label>
                  <input
                    defaultValue={data.getTodo.detail}
                    type="text"
                    className="form-control rounded-0 py-2"
                    id="detail"
                    {...register("detail", { required: true })}
                  />
                  {errors.detail && <span className="text-danger fw-semibold">This field is required</span>}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="date"
                    className="form-label mb-1 h6 ">
                    Date{" "}
                  </label>
                  <input
                    defaultValue={data.getTodo.date}
                    type="date"
                    className="form-control rounded-0 py-2"
                    id="date"
                    {...register("date", { required: true })}
                  />
                  {errors.date && <span className="text-danger fw-semibold">This field is required</span>}
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="reset"
                  value="Reset"
                  className="btn btn-dark rounded-0">
                  Reset
                </button>
                <button
                  type="submit"
                  className="btn btn-dark rounded-0 px-3">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
