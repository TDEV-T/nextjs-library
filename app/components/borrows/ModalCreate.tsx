import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Datum } from "@/app/model/BorrowModel";
import {  BookData } from "@/app/model/BookModel";
import {  MemberModel } from "@/app/model/MemberModel";
import { toast } from "sonner";
import { createBook, getBookData } from "@/app/service/book";
import { getMemberData } from "@/app/service/member";
import { createBorrow } from "@/app/service/borrow";

const ModalCreateBorrow = ({ fetchData }: { fetchData: any }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Datum | null>(null);
  const [bookData, setbookData] = useState<BookData | null>(null);
  const [memberData, setMemberData] = useState<MemberModel | null>(null);

  useEffect(() => {
    fetchDataAll();
  }, []);

  const fetchDataAll = async () => {
    const bdata = await getBookData();
    setbookData(bdata);

    const mdata = await getMemberData();
    setMemberData(mdata);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
    const data = await createBorrow(formData!);
    if (data.status) {
      toast.success(data.message);
      await fetchData();
    } else {
      toast.error(data.message);
    }
  };

  const handleChangeSelect = async (e:React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }


  const cancelButtonRef = useRef(null);
  return (
    <>
      <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => {
          setOpen(true);
        }}
      >
        Borrow
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white dark:bg-gray-700 dark:text-white px-4  pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6  dark:text-white text-gray-900"
                        >
                          Borrow Detail
                        </Dialog.Title>
                        <div className="mt-2">
                          <form
                            className="max-w-md mx-auto"
                            onSubmit={handleSubmit}
                          >
                            <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="date"
                                name="br_date_br"
                                value={formData?.br_date_br!}
                                onChange={handleChange}
                                id="floating_email"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Borrow Date
                              </label>
                            </div>
                            {/* <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="datetime-local"
                                name="br_date_rt"
                                value={formData?.br_date_br!}
                                onChange={handleChange}
                                id="floating_password"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="floating_password"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Date Return
                              </label>
                            </div> */}
                            <div className="relative z-0 w-full mb-5 group">
                              <div>
                                <label
                                  htmlFor="countries"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Member Borrow
                                </label>
                                <select
                                  name="m_user"
                                  value={formData?.m_user}
                                  onChange={handleChangeSelect}
                                  id="countries"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  <option selected>Choose a Member</option>
                                  {memberData?.data?.map((mem,index) => (
                                    <option key={index} value={mem.m_user}>{mem.m_name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                              <div>
                                <label
                                  htmlFor="countries"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Book Borrow
                                </label>
                                <select
                                  name="b_id"
                                  value={formData?.b_id}
                                  onChange={handleChangeSelect}
                                  id="countries"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  <option selected>Choose a Book</option>
                                  {bookData?.data?.map((book,index) => (
                                    <option key={index} value={book.b_id}>{book.b_name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* <div className="relative z-0 w-full mb-5 group">
                              <input
                                type="number"
                                value={formData?.br_fine}
                                name="br_fine"
                                onChange={handleChange}
                                id="floating_repeat_password"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="floating_repeat_password"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Borrow Fine
                              </label>
                            </div> */}

                            <button
                              type="submit"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Create
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 dark:bg-gray-700 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ModalCreateBorrow;
