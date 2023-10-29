import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Layout, Form, Input, Image, List, Tag } from "antd";
import { GetComicById, GetCategory, GetComic } from "../../services/http";
import { ComicsInterface } from "../../interfaces/IComics";
import { CategoryInterface } from "../../interfaces/ICategory";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import ReviewProduct from "../../components/ReviewProduct/ReviewProduct";
const { Content } = Layout;

const ProfileComic: React.FC = () => {
  const [comic, setComic] = useState<ComicsInterface | null>(null);

  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  // Get comic ID from URL params
  let { id } = useParams();

  // Create form instance
  const [form] = Form.useForm();

  // const getComics = async () => {
  //   const res = await GetComic();
  //   if (res) {
  //     setComic(res);
  //   }
  // };

  const getCategories = async () => {
    const res = await GetCategory();
    if (res) {
      setCategories(res);
    }
  };

  const getComicById = async () => {
    try {
      const res = await GetComicById(Number(id));
      if (res) {
        setComic(res);

        // Set form values with comic data
        form.setFieldsValue({
          Title: res.Title,
          Description: res.Description,
          Url: res.Url,
          Price: res.Price,
          Image: res.Image,
          CategoryID: res.CategoryID,
        });
      }
    } catch (error) {
      console.error("Error fetching comic by ID:", error);
    }
  };

  useEffect(() => {
    getComicById();
    // getComics();

    getCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Added id as a dependency to fetch data when id changes

  return (
    <>
      <Form>
        <Header />
        <Navbar />
        <div className="bg-base-200 h-screen">
          <div>
            <div className="text-center text-4xl pt-8 text-black">
              {/* Display comic title here */}
              {comic && (
                <h1 className="my-10 flex justify-center items-center capitalize text-3xl font-bold">
                  {comic.Title}
                </h1>
              )}
            </div>
            <div className="">
              {comic && (
                <>
                  <div className="my-8 flex justify-center items-center gap-y-8  lg:gap-x-16 h-50">
                    {/* <Image
                        width={200}
                        src= {comic ? comic.Image : ''}
                      /> */}
                    <Image
                      // preview={false}
                      src={comic ? comic.Image : ""}
                      width={450}
                      className="object-cover rounded-lg lg:w-full"
                    />
                    <div>
                      <h4 className="text-3xl  font-bold mt-2">Price</h4>
                      <p className="mt-3 text-3xl">฿ {comic.Price} </p>
                      {categories
                        .filter((category) => category.ID === comic.CategoryID)
                        .map((selectedCategory) => (
                          <Tag
                            className="text-2xl mt-4"
                            key={selectedCategory.ID}
                          >
                            {selectedCategory.Name}
                          </Tag>
                        ))}
                      <p className="mt-6 leading-8 text-xl w-56">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quasi
                      </p>
                      {/* COLORS */}
                      <div className="mt-6">
                        <h4 className="text-md font-medium tracking-wider capitalize">
                          {/* colors */}
                        </h4>
                      </div>
                      {/* <div className="form-control w-full max-w-xs">
                              <label className="label" htmlFor="amount">
                                <h4 className="text-md font-medium -tracking-wider capitalize">
                                  Price
                                </h4>
                              </label>
                            </div> */}
                      <div className="mt-10">
                        <button className="btn btn-secondary btn-md">
                          Add to bag
                        </button>
                      </div>
                    </div>
                    {/* <p>{comic.Url}</p>
                      <p>{comic.Price}</p> */}
                    {/* Add more fields as needed */}
                  </div>
                  <div className="w-3/4 mx-auto text-center">
                    <p className="text-xl  ">{comic.Description}</p>
                  </div>
                  <hr className="mt-4"/>
                </>
              )}
              {/* <div className="text-center"> */}
              <ReviewProduct/>
              {/* </div> */}
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default ProfileComic;
