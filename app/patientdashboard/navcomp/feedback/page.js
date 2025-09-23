"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import PatientNavbar from "../../navfooter/navbar/navbar";
import {
  FaStar,
  FaSmile,
  FaFrown,
  FaMeh,
  FaCalendarAlt,
  FaUserMd,
  FaSpa,
  FaArrowLeft,
  FaComment,
  FaPaperPlane,
  FaHistory,
  FaRegStar,
  FaLeaf,
} from "react-icons/fa";

const FeedbackPage = () => {
  const [activeTab, setActiveTab] = useState("new");
  const [submittedFeedback, setSubmittedFeedback] = useState([]);

  // Form state with proper defaults
  const [formData, setFormData] = useState({
    therapyType: "",
    therapist: "",
    appointmentDate: "",
    rating: 0,
    comfortLevel: "Comfortable",
    doshaBalance: "Not Sure",
    therapistGuidance: "Somewhat",
    oilSuitability: "Perfectly suited",
    postTherapyEffects: [],
    comments: "",
  });

  // Post-therapy effects options
  // Post-therapy effects options - UPDATE TO MATCH SCHEMA
  const postTherapyEffectsOptions = [
    { id: "Better Digestion", label: "Better Digestion" },
    { id: "Improved Sleep", label: "Improved Sleep" },
    { id: "Stress Relief", label: "Stress Relief" },
    { id: "Increased Energy", label: "Increased Energy" },
    { id: "Better Skin Health", label: "Better Skin Health" },
    { id: "Reduced Pain", label: "Reduced Pain" },
    { id: "Mental Clarity", label: "Mental Clarity" },
    { id: "Improved Immunity", label: "Improved Immunity" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFeedback = localStorage.getItem("patientFeedback");
      if (savedFeedback) {
        setSubmittedFeedback(JSON.parse(savedFeedback));
      }
    }
  }, []);

  // Recent therapies with proper IDs
  const recentTherapies = [
    {
      id: "therapy_1",
      name: "Abhyanga",
      therapist: "Dr. Sharma",
      therapistId: "therapist_1",
      appointmentId: "appointment_1",
      date: "2023-11-10",
    },
    {
      id: "therapy_2",
      name: "Shirodhara",
      therapist: "Dr. Patel",
      therapistId: "therapist_2",
      appointmentId: "appointment_2",
      date: "2023-11-05",
    },
    {
      id: "therapy_3",
      name: "Basti",
      therapist: "Dr. Gupta",
      therapistId: "therapist_3",
      appointmentId: "appointment_3",
      date: "2023-10-28",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleTherapySelect = (therapy) => {
    setFormData((prev) => ({
      ...prev,
      therapyType: therapy.name,
      therapist: therapy.therapist,
      appointmentDate: therapy.date,
      therapyId: therapy.id,
      therapistId: therapy.therapistId,
      appointmentId: therapy.appointmentId,
    }));
  };

  const handleCheckboxChange = (effectId) => {
    setFormData((prev) => {
      const currentEffects = [...prev.postTherapyEffects];
      if (currentEffects.includes(effectId)) {
        return {
          ...prev,
          postTherapyEffects: currentEffects.filter((id) => id !== effectId),
        };
      } else {
        return { ...prev, postTherapyEffects: [...currentEffects, effectId] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = {
      therapyType: "Therapy type",
      therapist: "Therapist",
      appointmentDate: "Appointment date",
      rating: "Rating",
      comfortLevel: "Comfort level",
      doshaBalance: "Dosha balance",
      therapistGuidance: "Therapist guidance",
      oilSuitability: "Oil suitability",
    };

    const missingFields = Object.keys(requiredFields).filter(
      (field) => !formData[field]
    );

    if (missingFields.length > 0) {
      alert(
        `Please fill in all required fields: ${missingFields
          .map((field) => requiredFields[field])
          .join(", ")}`
      );
      return;
    }

    if (formData.rating < 1) {
      alert("Please provide a rating");
      return;
    }

    try {
      // Prepare the data to send to backend
      const feedbackData = {
        therapyId: formData.therapyId,
        therapyType: formData.therapyType,
        appointmentId: formData.appointmentId,
        appointmentDate: formData.appointmentDate,
        therapistId: formData.therapistId,
        therapistName: formData.therapist,
        overallRating: formData.rating,
        comfortLevel: formData.comfortLevel,
        doshaBalance: formData.doshaBalance,
        therapistGuidance: formData.therapistGuidance,
        oilSuitability: formData.oilSuitability,
        postTherapyEffects: formData.postTherapyEffects,
        comments: formData.comments,
        wouldRecommend: formData.rating >= 4,
      };

      console.log("Sending feedback data:", feedbackData);

      const res = await fetch("/api/patient/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      console.log("Response status:", res.status);

      let result;
      try {
        result = await res.json();
        console.log("Backend response:", result);
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError);
        throw new Error(`Backend returned invalid JSON. Status: ${res.status}`);
      }

      if (res.ok) {
        // Success - save to local storage and update state
        const newFeedback = {
          id: submittedFeedback.length + 1,
          ...formData,
          submissionDate: new Date().toISOString().split("T")[0],
        };

        const updatedFeedback = [newFeedback, ...submittedFeedback];
        setSubmittedFeedback(updatedFeedback);
        localStorage.setItem(
          "patientFeedback",
          JSON.stringify(updatedFeedback)
        );

        // Reset form with default values
        setFormData({
          therapyType: "",
          therapist: "",
          appointmentDate: "",
          rating: 0,
          comfortLevel: "Comfortable",
          doshaBalance: "Not Sure",
          therapistGuidance: "Somewhat",
          oilSuitability: "Perfectly suited",
          postTherapyEffects: [],
          comments: "",
        });

        setActiveTab("history");
        alert("Thank you for your feedback!");
      } else {
        alert(
          `Failed to submit feedback: ${result.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-amber-400">
            {i < rating ? <FaStar /> : <FaRegStar />}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <PatientNavbar />
      <div className="min-h-screen bg-amber-50">
        <header className="bg-gradient-to-r from-green-700 to-amber-700 text-white py-6 px-4 shadow-md">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/patient/dashboard"
              className="inline-flex items-center text-amber-200 hover:text-white mb-2"
            >
              <FaArrowLeft className="mr-2" /> Back to Dashboard
            </Link>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Ayurvedic Therapy Feedback
                </h1>
                <p className="text-amber-100">
                  Share your Panchakarma experience
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-amber-500 p-3 rounded-full">
                  <FaComment className="text-xl text-white" />
                </div>
                <div>
                  <p className="font-medium">Welcome to Feedback Portal</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex border-b border-amber-200 mb-6 bg-white rounded-t-lg">
            <button
              onClick={() => setActiveTab("new")}
              className={`px-6 py-3 font-medium flex items-center ${
                activeTab === "new"
                  ? "text-green-700 border-b-2 border-green-700"
                  : "text-gray-600"
              }`}
            >
              <FaComment className="mr-2" /> New Feedback
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-3 font-medium flex items-center ${
                activeTab === "history"
                  ? "text-green-700 border-b-2 border-green-700"
                  : "text-gray-600"
              }`}
            >
              <FaHistory className="mr-2" /> Feedback History
            </button>
          </div>

          <div className="bg-white rounded-b-lg shadow-md p-6 mb-8">
            {activeTab === "new" && (
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  Share Your Ayurvedic Experience
                </h2>
                <p className="text-gray-600 mb-6">
                  Your feedback helps us enhance your Panchakarma journey.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">
                      <FaSpa className="inline mr-2" />
                      Select Therapy
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {recentTherapies.map((therapy) => (
                        <div
                          key={therapy.id}
                          onClick={() => handleTherapySelect(therapy)}
                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                            formData.therapyType === therapy.name
                              ? "border-green-500 bg-green-50"
                              : "border-amber-200 hover:bg-amber-50"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-green-700">
                                {therapy.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                with {therapy.therapist}
                              </p>
                            </div>
                            <div className="text-xs text-gray-500">
                              <FaCalendarAlt className="inline mr-1" />
                              {new Date(therapy.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {formData.therapyType && (
                    <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
                      <h4 className="font-semibold text-green-700">
                        Selected Therapy: {formData.therapyType} with{" "}
                        {formData.therapist} on{" "}
                        {new Date(
                          formData.appointmentDate
                        ).toLocaleDateString()}
                      </h4>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">
                      Overall Rating
                    </h3>
                    <div className="flex space-x-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => handleRatingClick(star)}
                          className="text-3xl text-black focus:outline-none"
                        >
                          {star <= formData.rating ? (
                            <FaStar className="text-amber-400" />
                          ) : (
                            <FaRegStar className="text-amber-300" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">
                      Dosha Balance Awareness
                    </h3>
                    <p className="text-gray-700 mb-3">
                      "Do you feel your dosha imbalance was addressed after
                      therapy?"
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {["Yes", "Not Sure", "No"].map((option) => (
                        <label
                          key={option}
                          className="flex text-black items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-white"
                        >
                          <input
                            type="radio"
                            name="doshaBalance"
                            value={option}
                            checked={formData.doshaBalance === option}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 ${
                              formData.doshaBalance === option
                                ? "bg-green-500 border-green-500"
                                : "border-gray-300"
                            }`}
                          ></div>
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">
                      Post-Therapy Effects
                    </h3>
                    <p className="text-gray-700 mb-3">
                      "Did you notice any positive changes after the therapy?"
                    </p>
                    <div className="grid text-black grid-cols-1 md:grid-cols-2 gap-3">
                      {postTherapyEffectsOptions.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-white"
                        >
                          <input
                            type="checkbox"
                            checked={formData.postTherapyEffects.includes(
                              option.id
                            )}
                            onChange={() => handleCheckboxChange(option.id)}
                            className="w-5 h-5 text-green-600 rounded"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 p-4 text-black bg-amber-50 rounded-lg border border-amber-200">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">
                      Therapist's Guidance
                    </h3>
                    <p className="text-gray-700 mb-3">
                      "Did the therapist explain the Panchakarma process
                      clearly?"
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {["Yes", "Somewhat", "No"].map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-white"
                        >
                          <input
                            type="radio"
                            name="therapistGuidance"
                            value={option}
                            checked={formData.therapistGuidance === option}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 ${
                              formData.therapistGuidance === option
                                ? "bg-green-500 border-green-500"
                                : "border-gray-300"
                            }`}
                          ></div>
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">
                      Oil & Herbal Application
                    </h3>
                    <p className="text-gray-700 mb-3">
                      "Was the herbal oil application suitable for your skin?"
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {["Perfectly suited", "Mild irritation", "Too oily"].map(
                        (option) => (
                          <label
                            key={option}
                            className="flex text-black items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-white"
                          >
                            <input
                              type="radio"
                              name="oilSuitability"
                              value={option}
                              checked={formData.oilSuitability === option}
                              onChange={handleInputChange}
                              className="hidden text-black"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 ${
                                formData.oilSuitability === option
                                  ? "bg-green-500 border-green-500"
                                  : "border-gray-300"
                              }`}
                            ></div>
                            <span>{option}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">
                      Comfort Level
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {["Very Comfortable", "Comfortable", "Uncomfortable"].map(
                        (option) => (
                          <label
                            key={option}
                            className="flex text-black items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-amber-50"
                          >
                            <input
                              type="radio"
                              name="comfortLevel"
                              value={option}
                              checked={formData.comfortLevel === option}
                              onChange={handleInputChange}
                              className="hidden"
                            />
                            <div
                              className={`p-2 rounded-full ${
                                formData.comfortLevel === option
                                  ? "bg-amber-100"
                                  : "bg-gray-100"
                              }`}
                            >
                              {option === "Very Comfortable" ? (
                                <FaSmile className="text-2xl text-green-500" />
                              ) : option === "Comfortable" ? (
                                <FaMeh className="text-2xl text-amber-500" />
                              ) : (
                                <FaFrown className="text-2xl text-red-500" />
                              )}
                            </div>
                            <span>{option}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">
                      Additional Comments
                    </h3>
                    <textarea
                      name="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full text-black p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Share your experience..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!formData.therapyType || !formData.rating}
                      className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                    >
                      <FaPaperPlane className="mr-2" /> Submit Feedback
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "history" && (
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  Feedback History
                </h2>
                {submittedFeedback.length > 0 ? (
                  <div className="space-y-6">
                    {submittedFeedback.map((feedback) => (
                      <div
                        key={feedback.id}
                        className="border text-black border-amber-100 rounded-lg p-5 bg-amber-50"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-green-700">
                              {feedback.therapyType}
                            </h3>
                            <p className="text-sm text-gray-600">
                              with {feedback.therapist} •{" "}
                              {new Date(
                                feedback.appointmentDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            Submitted on{" "}
                            {new Date(
                              feedback.submissionDate
                            ).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="font-medium">Rating:</span>{" "}
                            {renderStars(feedback.rating)}
                          </div>
                          <div>
                            <span className="font-medium">Comfort:</span>{" "}
                            {feedback.comfortLevel}
                          </div>
                          <div>
                            <span className="font-medium">Dosha Balance:</span>{" "}
                            {feedback.doshaBalance}
                          </div>
                          <div>
                            <span className="font-medium">Guidance:</span>{" "}
                            {feedback.therapistGuidance}
                          </div>
                          <div>
                            <span className="font-medium">
                              Oil Suitability:
                            </span>{" "}
                            {feedback.oilSuitability}
                          </div>
                        </div>

                        {feedback.postTherapyEffects.length > 0 && (
                          <div className="mb-3">
                            <span className="font-medium">Effects:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {feedback.postTherapyEffects.map((effect) => (
                                <span
                                  key={effect}
                                  className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
                                >
                                  {postTherapyEffectsOptions.find(
                                    (opt) => opt.id === effect
                                  )?.label || effect}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {feedback.comments && (
                          <div>
                            <span className="font-medium">Comments:</span>{" "}
                            <p className="mt-1 italic">"{feedback.comments}"</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <FaComment className="text-5xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      No Feedback Yet
                    </h3>
                    <button
                      onClick={() => setActiveTab("new")}
                      className="flex items-center mx-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      <FaComment className="mr-2" /> Submit Feedback
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackPage;
