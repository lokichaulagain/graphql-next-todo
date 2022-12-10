import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function Index() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const handleAllField = watch();
  console.log(handleAllField);

  // const createTodo=async()=>{
  //  console.log()

  // }

  return (
    <>
      <div className="d-flex justify-content-center mt-5 pt-5">
        <button
          type="button"
          className="btn btn-dark rounded-0 "
          data-bs-toggle="modal"
          data-bs-target="#exampleModal">
          Add Todo
        </button>

        <form
          // onSubmit={handleSubmit(createTodo)}
          className="modal fade"
          id="exampleModal"
          tab-index="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
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
                  {errors.title && <span>This field is required</span>}
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
                  {errors.detail && <span>This field is required</span>}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="date"
                    className="form-label mb-1 h6 ">
                    Date{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0 py-2"
                    id="date"
                    {...register("date", { required: true })}
                  />
                  {errors.date && <span>This field is required</span>}
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
                  type="button"
                  className="btn btn-dark rounded-0 px-3"
                  data-bs-dismiss="modal">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Table-------------------------------- */}
      </div>
      <table className="table table-hover mt-5 ">
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Title</th>
            <th scope="col">Detail</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm rounded-0 btn-info px-3 fw-semibold">
                view
              </button>
              <button
                type="button"
                className="btn btn-sm rounded-0 btn-warning px-3 fw-semibold">
                Edit
              </button>
              <button
                type="button"
                className="btn btn-sm rounded-0 btn-danger fw-semibold">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Index;
