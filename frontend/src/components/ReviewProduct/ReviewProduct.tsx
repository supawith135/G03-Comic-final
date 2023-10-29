import React, { useState, useEffect } from "react";
import { GetComicById, GetReviewById } from "../../services/http";
import { List, Card, Rate, Avatar , Form} from "antd";
import { ReviewInterface } from "../../interfaces/lReview";

import { useParams } from "react-router-dom";

function ReviewProduct() {
  const [review, setReview] = useState<ReviewInterface | null>(null);
  const [review1, setReview1] = useState<ReviewInterface[]>([]);
  let { id } = useParams();
  const [form] = Form.useForm();
  const getReviewById = async () => {
    let res = await GetReviewById(Number(id));
    if (res) {
        setReview(res);
    
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({
        ComicID: res.number,
        Comment: res.Comment,
        RatingID: res.RatingID,
      });
    }
  };

  useEffect(() => {
    getReviewById();

  }, [id]);



  return (
    <>
      <div className="bg-base-200">

        {review && (
            <div>

                <h1 className="my-10 mx-auto ml-10  capitalize text-3xl font-bold">
                <p><Rate disabled defaultValue={review.RatingID} /></p>
                <p className="ml-12">   {review.Comment}</p>
                </h1>
            </div>
        )}
 
       
                     
      </div>
    </>
  );
}
export default ReviewProduct;
