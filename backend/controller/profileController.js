const Profile = require("../modules/profile");
const cloudinary = require("../config/cloudniry");

// GET profile by user ID
const getProfileByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Error fetching profile" });
  }
};

// CREATE profile
// const createProfile = async (req, res) => {
//   const {
//     firstName,
//     lastName,
//     email,
//     phone,
//     address = {},
//   } = req.body;

//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "Profile image is required" });
//     }

//     const fileType = req.file.mimetype.split("/")[0];
//     if (fileType !== "image") {
//       return res.status(400).json({ error: "Only image files are allowed" });
//     }

//     const uploadResult = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           resource_type: "image",
//           folder: "profileImages",
//         },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       );
//       uploadStream.end(req.file.buffer);
//     });

//     const newProfile = new Profile({
//       userId: req.body.userId,
//       firstName,
//       lastName,
//       email,
//       phone,
//       image: uploadResult.secure_url,
//       publicId: uploadResult.public_id,
//       address: {
//         street: address.street,
//         city: address.city,
//         state: address.state,
//         country: address.country,
//         pincode: address.pincode,
//       },
//     });

//     const savedProfile = await newProfile.save();
//     res.status(201).json({
//       success: true,
//       message: "Profile created successfully",
//       data: savedProfile,
//     });
//   } catch (error) {
//     console.error("Profile creation error:", error);
//     res.status(500).json({ error: "Failed to create profile" });
//   }
// };

const createProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address = {},
  } = req.body;

  try {
    // Get userId from token via middleware
    const userId = req.userId;

    // Prevent duplicate profile
    const existing = await Profile.findOne({ userId });
    if (existing) {
      return res.status(400).json({ error: "Profile already exists for this user" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Profile image is required" });
    }

    const fileType = req.file.mimetype.split("/")[0];
    if (fileType !== "image") {
      return res.status(400).json({ error: "Only image files are allowed" });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "profileImages",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    const newProfile = new Profile({
      userId,
      firstName,
      lastName,
      email,
      phone,
      image: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      address: {
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        pincode: address.pincode,
      },
    });

    const savedProfile = await newProfile.save();
    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: savedProfile,
    });
  } catch (error) {
    console.error("Profile creation error:", error);
    res.status(500).json({ error: "Failed to create profile" });
  }
};


// UPDATE profile
const updateProfile = async (req, res) => {
  const userId = req.params.userId;
  const {
    firstName,
    lastName,
    email,
    phone,
    address = {},
  } = req.body;

  try {
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Update fields
    const updatedData = {
      firstName,
      lastName,
      email,
      phone,
      address: {
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        pincode: address.pincode,
      },
    };

    // If a new image is uploaded
    if (req.file) {
      // Delete old image
      if (profile.publicId) {
        await cloudinary.uploader.destroy(profile.publicId);
      }

      // Upload new image
      const fileType = req.file.mimetype.split("/")[0];
      if (fileType !== "image") {
        return res.status(400).json({ error: "Only image files are allowed" });
      }

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "profileImages",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      updatedData.image = result.secure_url;
      updatedData.publicId = result.public_id;
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
      updatedData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

module.exports = {
  getProfileByUserId,
  createProfile,
  updateProfile,
};
