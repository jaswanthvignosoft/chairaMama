"use client"
import { useEffect, useRef, useState } from 'react'
import style from "./galleryAdd.module.scss"
import Image from 'next/image';
import { AddGalleryData } from '@/services/AddGalleryData';
import { useGalleryData } from '@/app/admin/gallery/page';
const GalleryAdd = ({ addData, setAddData }) => {
  const { data, helper } = useGalleryData()
  const [galleryTitle, setGalleryTitle] = useState("")
  const [galleryImage, setGalleryImage] = useState("");
  const imageRef = useRef()
  const [products, setProduct] = useState([])

  const AddData = async () => {
    await AddGalleryData({ galleryImage, galleryTitle, helper, setAddData, clearForm })
  }

  const clearForm = () => {
    setGalleryImage("")
    setGalleryTitle("")
    imageRef.current.value = ""
    setProduct(Array.from(new Set(data?.map((val)=>val?.galleryTitle?.toUpperCase())))) 
  }
  useEffect(() => {
    clearForm()
  }, [data])

  return (
    <div className={style.modal + ` modal fade ${addData && "show d-block"} `} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button onClick={() => setAddData(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body  d-flex justify-content-center align-items-center">

            <div className={' container-fluid my-4  '}>
              <div className={style.galleryAdd + 'row col-12 col-lg-10 shadow rounded-4 p-4 mx-auto'}>
                <div className={style.header + ' row col-12 mx-auto'}>
                  <h3 className={style.heading + ' fw-bold col-auto my-auto text-capitalize'}>add Gallery Image</h3>
                </div>
                <hr />
                <div className='row col-12 mx-auto mt-2'>
                  <div>
                    <div className="mb-4">
                      <label className="form-label text-capitalize">Choose an existing title or enter a new one</label>
                      <select class="form-select" value={products.includes(galleryTitle)?galleryTitle:""} onChange={(e) => setGalleryTitle(e.target?.value)}>
                      <option value="" disabled selected>Select Existing Title</option>
                        {
                          products?.map((val, index) => {
                            return (
                              <option key={index + " " + val} value={val}>{val}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="mb-4">
                      {/* <label className="form-label text-capitalize">Title</label> */}
                      <input  autocomplete="off"   value={galleryTitle} onChange={(e) => setGalleryTitle(e.target?.value)} type="text" className="form-control" placeholder='Enter new title here' />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-capitalize">add Image</label>
                      <Image className={style.image + " rounded w-100 h-100 mb-4"} width={250} height={200} objectFit="cover" src={typeof galleryImage === "string" && galleryImage?.includes("http") ? galleryImage : galleryImage != null && galleryImage instanceof File ? URL.createObjectURL(galleryImage) : "/assets/images/1.png"} hidden={galleryImage ? false : true} alt="..." />
                      <input  autocomplete="off"   onChange={(e) => setGalleryImage(e.target?.files[0])} ref={imageRef} type="file" accept="image/*" className="form-control" />
                    </div>
                    <div className='row col-12 '>
                      <button onClick={clearForm} type="reset" className="btn btn-dark d-flex col-auto px-4 ms-auto text-center justify-content-center text-capitalize">reset</button>
                      <button onClick={AddData} type="submit" className="btn btn-primary d-flex col-auto px-4 ms-2 text-center justify-content-center text-capitalize">submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={() => setAddData(false)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GalleryAdd