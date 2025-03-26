import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Input,
  Upload,
  Button,
  Select,
  message,
  Card,
  Switch,
  InputNumber,
} from "antd";
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { storage, fireStore } from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../assets/css/addtopic.css";

const { Option } = Select;

const AddContent = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [addingClass, setAddingClass] = useState(false);
  const [newClass, setNewClass] = useState("");
  const [savingDraft, setSavingDraft] = useState(false);
  const [form] = Form.useForm();


  useEffect(() => {
    const fetchClasses = async () => {
      const querySnapshot = await getDocs(collection(fireStore, "classes"));

      const fetchedClasses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));

      setClasses(fetchedClasses);

      const draft = JSON.parse(localStorage.getItem("draft"));

      if (draft) {
        setDescription(draft.description || "");

        form.setFieldsValue(draft);
      }
    };

    fetchClasses();
  }, [form]);

  // Handle form submission

  const onFinish = async (values) => {
    const {
      topic,
      class: selectedClasses,
      category,
      subCategory,
      file,
    } = values;

    setUploading(true);

    let fileUrls = [];

    if (file && file.length > 0) {
      try {
        const uploadPromises = file.map((fileItem) => {
          const uniqueFileName = `${Date.now()}-${fileItem.name}`;

          const storageRef = ref(storage, `uploads/${uniqueFileName}`);

          const uploadTask = uploadBytesResumable(
            storageRef,
            fileItem.originFileObj
          );

          return new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",

              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                console.log(`Upload is ${progress}% done`);
              },

              (error) => {
                console.error("Upload failed:", error);

                message.error("File upload failed.", 3);

                reject(error);
              },

              async () => {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );

                fileUrls.push(downloadURL);

                resolve();
              }
            );
          });
        });

        await Promise.all(uploadPromises);
      } catch (error) {
        setUploading(false);

        return;
      }
    }

    try {
      const topicData = {
        topic: topic || "",

        class: selectedClasses.join(", "),

        category: category || "",

        subCategory: subCategory || "", // Set subCategory as "MCQ Test" if isMCQ is true

        description: description || "", // Hide description for MCQ

        fileUrls,

        timestamp: new Date(),
      };

      await addDoc(collection(fireStore, "topics"), topicData);

      message.success("Topic created successfully!", 3);

      localStorage.removeItem("draft");
    } catch (e) {
      console.error("Error adding document:", e);

      message.error("Failed to save topic.", 3);
    } finally {
      setUploading(false);
    }
  };

  // Handle class addition

  const handleAddClass = async () => {
    if (newClass && !classes.some((cls) => cls.name === newClass)) {
      setAddingClass(true);

      try {
        const docRef = await addDoc(collection(fireStore, "classes"), {
          name: newClass,
        });

        setClasses([...classes, { id: docRef.id, name: newClass }]);

        setNewClass("");

        message.success(`Class ${newClass} added successfully!, 3`);
      } catch (e) {
        console.error("Error adding class:", e);

        message.error("Failed to add class.", 3);
      } finally {
        setAddingClass(false);
      }
    }
  };

  return (
    <div className="form-container mt-2">
      <h1 className="text-center mb-2 py-5">Create New Topic</h1>

      <Card
        bordered={false}
        style={{ margin: "20px auto", width: "100%", borderRadius: "10px" }}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item label="Topic Name" name="topic">
            <Input placeholder="Enter topic name" />
          </Form.Item>

          <Form.Item
            label="Class"
            name="class"
            rules={[{ required: true, message: "Please select a class!" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select class(es)"
              dropdownRender={(menu) => (
                <>
                  {menu}

                  <div
                    style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}
                  >
                    <Input
                      style={{ flex: "auto" }}
                      placeholder="Add new class"
                      value={newClass}
                      onChange={(e) => setNewClass(e.target.value)}
                      onPressEnter={handleAddClass}
                    />

                    <Button
                      type="primary"
                      icon={
                        addingClass ? <LoadingOutlined /> : <PlusOutlined />
                      }
                      onClick={handleAddClass}
                    >
                      {addingClass ? "Adding..." : "Add"}
                    </Button>
                  </div>
                </>
              )}
            >
              {classes.map((classOption) => (
                <Option key={classOption.id} value={classOption.name}>
                  {classOption.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Input placeholder="Enter category" />
          </Form.Item>

          {/* <Form.Item label="subCategory" name="subCategory">
            <Input placeholder="Enter subCategory" />
          </Form.Item> */}

          <Form.Item label="Description" name="description">
            <Input.TextArea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            //   autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item label="Upload File" name="file" valuePropName="fileList" getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}>
            <Upload name="file" beforeUpload={() => false} accept=".jpg,.jpeg,.png,.pdf" multiple>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={uploading}>
              {uploading ? <LoadingOutlined /> : "Submit"}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" block onClick={() => navigate('/dashboard/ManageProducts')}>
              Manage Topics
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddContent;
