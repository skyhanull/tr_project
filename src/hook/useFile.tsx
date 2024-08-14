// import { useState } from "react";

// export const useImageUpload = () => {
//   const [imageFile, setImageFile] = useState<File | null>(null); // 이미지 파일 상태
//   const [imagePreview, setImagePreview] = useState<string | null>(null); // 이미지 미리보기 상태

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const resetImage = () => {
//     setImageFile(null);
//     setImagePreview(null);
//   };

//   return {
//     imageFile,
//     imagePreview,
//     handleImageUpload,
//     resetImage,
//   };
// };
