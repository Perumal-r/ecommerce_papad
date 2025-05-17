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
  const { name, description,price } = req.body;
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
            price,
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

const updatecategory = async (req, res) => {
  const { name, description,price } = req.body;
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    let updatedData = { name, description,price };

    // If a new image is uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (category.publicId) {
        await cloudinary.uploader.destroy(category.publicId);
      }

      // Upload new image
      const fileType = req.file.mimetype.split("/")[0];
      if (fileType !== "image") {
        return res.status(400).json({ error: "Only image files are allowed." });
      }

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "categorypapad",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      updatedData.imageUrl = result.secure_url;
      updatedData.publicId = result.public_id;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updatedData,
      { new: true }
    );
    res.json({
      success: true,
      message: "Category updated",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Delete image from Cloudinary
    if (category.publicId) {
      await cloudinary.uploader.destroy(category.publicId);
    }

    // Delete from DB
    await Category.findByIdAndDelete(categoryId);

    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  updatecategory,
  deleteCategory,
};
