import { useState } from "react"
import { API_URL } from "@/config/server"
import styles from '@/styles/Form.module.css';
import { FaThermometerFull } from "react-icons/fa";



export default function ImageUpload ({evtId,imageUploaded}){

    const [image,setImage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
       // console.log(e.target.files[0])
       formData.append('files',image)
       formData.append('rev','events')
       formData.append('revId',evtId)
       formData.append('field','image')

        const res = await fetch(`${API_URL}/api/upload`,{
            method: "POST",
            body: formData
        });

        if(res.ok){
            console.log();
            const image_uploaded = await res.json()
            console.log(image_uploaded[0])
            let image_data = {
                data: {
                    image: image_uploaded[0]
                }
            }

            //console.log(JSON.stringify(image_data))
            const res1 = await fetch(`${API_URL}/api/events/${evtId}`,{
                method: "PUT",
                body: JSON.stringify(image_uploaded)
            });

            console.log(await res1.json())

            imageUploaded()
        }
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0])
    }

    return (<div className={styles.form}>
        <h1>Upload Event Image</h1>
        <form onSubmit={handleSubmit}>
            <div className={styles.file}>
                <input type="file" onChange={handleFileChange}/>
            </div>
            <input type='submit' value="upload" className="btn"/>
        </form>
    </div>)
}