// import React, { useEffect, useState } from "react";
// import { fireStore } from "../config/firebase";
// import { collection, getDocs, doc, getDoc } from "firebase/firestore";
// import { jsPDF } from "jspdf"; // Import jsPDF
// import * as pdfjsLib from "pdfjs-dist"; // Import pdfjs-dist for PDF rendering
// import { Collapse, Button, Spin, Card } from 'antd'; // Import Ant Design components
// import { getAuth } from "firebase/auth"; // Import Firebase Auth
// import '../assets/css/pdflist.css'; // Import custom CSS

// const { Panel } = Collapse;

// const PdfList = () => {
//   const [pdfList, setPdfList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isDownloading, setIsDownloading] = useState(false); // State for loading indicator during download
//   const [userData, setUserData] = useState(null); // Store user data (institution name, address, logo, etc.)

//   useEffect(() => {
//     const fetchPdfList = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(fireStore, "institutionpdfs"));
//         const pdfs = [];
//         querySnapshot.forEach((doc) => {
//           const data = doc.data();
//           pdfs.push({
//             id: doc.id,
//             topic: data.topic,
//             description: data.description,
//             class: data.class, // Assuming PDFs have a class field
//             fileUrls: data.fileUrls,
//             timestamp: data.timestamp,
//           });
//         });
//         setPdfList(pdfs);
//       } catch (error) {
//         console.error("Error fetching PDFs: ", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchUserData = async () => {
//       const auth = getAuth();
//       const user = auth.currentUser;

//       if (user) {
//         const userDocRef = doc(fireStore, "users", user.uid);
//         const userDocSnap = await getDoc(userDocRef);

//         if (userDocSnap.exists()) {
//           setUserData(userDocSnap.data()); // Set the user data (institution name, address, logo, etc.)
//         } else {
//           console.log("No such document!");
//         }
//       }
//     };

//     fetchUserData(); // Fetch user data
//     fetchPdfList();  // Fetch PDF list
//   }, []);

//   // Group PDFs by class
//   const groupedPdfList = pdfList.reduce((acc, pdf) => {
//     if (!acc[pdf.class]) {
//       acc[pdf.class] = [];
//     }
//     acc[pdf.class].push(pdf);
//     return acc;
//   }, {});

//   // Function to open the PDF in a new tab
//   const viewPdf = (pdfUrl) => {
//     window.open(pdfUrl, "_blank");
//   };

//   // Function to download and modify the PDF with user details (auto-populated)
//   const downloadPdf = async (pdfUrl) => {
//     if (userData) {
//       const { institution, address, contactNumber, logo } = userData;
  
//       try {
//         setIsDownloading(true); // Set loading state
//         const loadingTask = pdfjsLib.getDocument(pdfUrl);
//         const pdfDocument = await loadingTask.promise;
  
//         const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  
//         const numPages = pdfDocument.numPages;
  
//         // Add Institution Name, Address, Contact Number, and Logo on the first page
//         if (logo) {
//           const img = new Image();
//           img.src = logo;
  
//           // Wait for the image to load
//           await new Promise((resolve) => {
//             img.onload = resolve;
//           });
  
//           // Add the logo image (move the logo to the far right, decrease width slightly for better fit)
//           doc.addImage(img, "JPEG", 170, 3, 30, 30); // Adjust logo size and position
//         }
  
//         // Add Institution Name (Large font, Bold, and Centered)
//         doc.setFontSize(22);
//         doc.setFont("helvetica", "bold");
//         doc.text(institution, 105, 10, { align: 'center' });
  
//         // Add Address below the Institution Name (Smaller font)
//         doc.setFontSize(16);
//         doc.setFont("helvetica", "normal");
//         doc.text(address, 105, 20, { align: 'center' });
  
//         // Add Contact Number below the Address (Even smaller font)
//         doc.setFontSize(12);
//         doc.text(contactNumber, 105, 25, { align: 'center' });
  
//         // Loop through each page of the original PDF and extract its content
//         for (let pageNum = 1; pageNum <= numPages; pageNum++) {
//           const page = await pdfDocument.getPage(pageNum);
//           const viewport = page.getViewport({ scale: 1.5 });
//           const canvas = document.createElement("canvas");
//           const context = canvas.getContext("2d");
  
//           canvas.height = viewport.height;
//           canvas.width = viewport.width;
  
//           // Render the page to the canvas
//           await page.render({ canvasContext: context, viewport }).promise;
//           const imageData = canvas.toDataURL("image/jpeg");
  
//           if (pageNum === 1) {
//             // For the first page, add the institution details and the content image
//             doc.addImage(imageData, "JPEG", 0, 30, 200, 297); // Adjust the content to start after the details (y = 50)
//           } else {
//             // For subsequent pages, just add the content image
//             doc.addPage();
//             doc.addImage(imageData, "JPEG", 0, 10, 210, 297); // Start at the top of the page
//           }
//         }
  
//         // Save the modified PDF with the institution details
//         doc.save(`${institution}_modified_pdf.pdf`);
        
//       } catch (error) {
//         console.error("Error modifying and downloading the PDF: ", error);
//       } finally {
//         setIsDownloading(false); // Reset loading state
//       }
//     } else {
//       alert("User data not available.");
//     }
//   };
  
//   if (loading) {
//     return <div className="loading-container"><Spin size="large" /></div>;
//   }

//   return (
//     <div className="pdf-list-container">
//       <h1 className="title">List of PDFs</h1>

//       {/* Group the PDFs by class */}
//       <Collapse accordion className="pdf-collapse">
//         {Object.keys(groupedPdfList).map((className) => (
//           <Panel header={`Class: ${className}`} key={className} className="pdf-panel">
//             <div className="pdf-list">
//               {groupedPdfList[className].map((pdf) => (
//                 <Card key={pdf.id} className="pdf-card" bordered={false}>
//                   <h3>{pdf.topic}</h3>
//                   <p>{pdf.description}</p>
//                   <p><strong>Class:</strong> {pdf.class}</p>
//                   <p><strong>Timestamp:</strong> {new Date(pdf.timestamp.seconds * 1000).toLocaleString()}</p>
//                   {pdf.fileUrls && pdf.fileUrls.map((url, index) => (
//                     <div key={index} className="pdf-actions">
//                       <Button type="link" onClick={() => viewPdf(url)}>View PDF</Button>
//                       <Button type="link" onClick={() => downloadPdf(url)}>Download PDF</Button>
//                     </div>
//                   ))}
//                 </Card>
//               ))}
//             </div>
//           </Panel>
//         ))}
//       </Collapse>

//       {/* Show loading spinner if downloading PDF */}
//       {isDownloading && (
//         <div className="download-loading">
//           <Spin size="large" />
//           <p>Processing PDF...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PdfList;
