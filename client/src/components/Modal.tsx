import { useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { ADD_TODO } from "../graphql/Mutation";
import {GET_TODOS} from "../graphql/Query";

const Modal = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const handleAllField = watch();

  const [addTodo] = useMutation(ADD_TODO);
  const createTodo = async () => {
    addTodo({
      variables: {
        title: handleAllField.title,
        detail: handleAllField.detail,
        date: handleAllField.date,
      },
      refetchQueries: [{ query: GET_TODOS }],
    });
    reset();
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-dark rounded-0 "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal">
        Add Todo
      </button>

      <form
        onSubmit={handleSubmit(createTodo)}
        className="modal fade "
        id="exampleModal"
        tab-index="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content rounded-0 border-0">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 "
                id="exampleModalLabel">
                Add Your Todo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="title"
                  className="form-label mb-1 h6 ">
                  Title{" "}
                </label>
                <input
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
                  type="date"
                  className="form-control rounded-0 py-2"
                  id="date"
                  {...register("date", { required: true })}
                />
                {errors.date && <span className="text-danger fw-semibold">This field is required</span>}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark rounded-0"
                data-bs-dismiss="modal">
                Cancel
              </button>
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
    </div>
  );
};

export default Modal;
