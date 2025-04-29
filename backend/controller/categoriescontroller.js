const Category = require("../modules/categories");
const cloudinary = require("../config/cloudniry");

// GET all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

const addCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }
    const fileType = req.file.mimetype.split("/")[0];
    let resourceType;
    if (fileType === "image") {
      resourceType = "image";
    } else {
      return res.status(400).json({
        error: "Invalid file type. Only images are allowed.",
      });
    }
    const result = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder: "categorypapad",
      },
      async (error, cloudinaryResult) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ error: "Cloudinary upload failed" });
        }

        try {
          const newCategory = new Category({
            name,
            description,
            imageUrl: cloudinaryResult.secure_url,
            publicId: cloudinaryResult.public_id,
          });

          const savedCategory = await newCategory.save();
          res.status(201).json({
            success: true,
            message: "Category added successfully",
            data: savedCategory,
          });
        } catch (saveError) {
          console.error("Error saving to database:", saveError);
          res.status(500).json({ error: "Failed to save sunglass data" });
        }
      }
    );

    result.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error });
  }
};

module.exports = {
  getAllCategories,
  addCategory,
};
