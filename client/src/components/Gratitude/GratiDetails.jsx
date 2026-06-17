import React, { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteGratitude, addGratitude, fetchGratitudes, setGratitudes } from "../../reducers/gratiSlice";
import { selectUser } from "../../reducers/authSlice";
import ConfirmBox from "../ConfirmBox";

const VITE_SERVER_IMAGE_URL = import.meta.env.VITE_SERVER_IMAGE_URL;

const GratiDetails = ({ date, onClose }) => {
  const gratitudes = useSelector((state) => state.gratitude.gratitudes);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletedate, setDeleteDate] = useState();

  const [isEditing, setIsEditing] = useState(false);
  const [editEntry, setEditEntry] = useState("");
  const [editFile, setEditFile] = useState(null);

  const isImageFile = (filename) => {
    if (!filename) return false;
    const ext = filename.split(".").pop().toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "webp", "svg", "heic", "heif"].includes(ext);
  };

  const handleEditClick = (entry) => {
    setEditEntry(entry.entry);
    setEditFile(null);
    setIsEditing(true);
  };

  const handleSave = async (entry) => {
    if (!editEntry.trim()) {
      alert("Reflections cannot be empty.");
      return;
    }
    try {
      if (user) {
        const imageFile = editFile ? editFile : "blank.jpg";
        const entryDate = moment.utc(entry.date).format("YYYY-MM-DD");
        await dispatch(
          addGratitude({
            date: entryDate,
            entry: editEntry,
            imageFile,
            userToken: user.token,
          })
        );
        const response = await dispatch(fetchGratitudes(user.token));
        dispatch(setGratitudes(response.payload));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error editing gratitude entry:", error);
    }
  };

  const handleDeleteConfirm = () => {
    setConfirmDelete(false);
    handleDelete({ deletedate });
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(false);
  };

  const handleDeleteClick = (date) => {
    setDeleteDate(date);
    setConfirmDelete(true);
  };

  // Compare local date string with stored UTC entry date string to completely eliminate timezone offset bugs!
  const targetDateStr = moment(date).format("YYYY-MM-DD");
  const gratitudesForDate = gratitudes.filter((entry) =>
    moment.utc(entry.date).format("YYYY-MM-DD") === targetDateStr
  );

  const handleDelete = async ({ deletedate }) => {
    let newDate = null;

    if (user) {
      try {
        newDate = moment(deletedate).format("YYYY-MM-DD");
        await dispatch(deleteGratitude({ newDate, userToken: user.token }));
      } catch (error) {
        console.log("Error deleting gratitude entry:", error);
      }
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#2D2A26]/40 backdrop-blur-sm z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#736E67]/10 w-full max-w-2xl overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#736E67]/[0.08] px-6 py-4 bg-white">
          <div>
            <p className="text-[#C38A72] text-[10px] font-semibold tracking-wider uppercase mb-0.5">Gratitude Memory</p>
            <h3 className="font-serif text-lg font-semibold text-[#2D2A26]">
              Entry for {moment(date).format("MMMM DD, YYYY")}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#736E67]/[0.05] text-[#736E67] hover:text-[#2D2A26] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content area */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          {gratitudesForDate.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-12 h-12 mx-auto text-[#736E67]/20 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="text-[#736E67]/60 text-sm font-light">No gratitude entry found for this date.</p>
            </div>
          ) : (
            gratitudesForDate.map((entry) => (
              <div key={entry._id} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1 text-left w-full">
                    <span className="text-[#7E8F7A] text-[10px] font-semibold tracking-wider uppercase mb-2 block">
                      Reflections
                    </span>
                    {isEditing ? (
                      <textarea
                        value={editEntry}
                        onChange={(e) => setEditEntry(e.target.value)}
                        className="w-full p-3 bg-white border border-[#736E67]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7E8F7A] font-serif text-sm leading-relaxed italic text-[#2D2A26] resize-none h-24"
                        placeholder="What are you grateful for?"
                      />
                    ) : (
                      <p className="text-[#2D2A26] font-serif text-lg leading-relaxed italic break-words">
                        "{entry.entry}"
                      </p>
                    )}
                  </div>
                  {/* Photo/attachment display and edit commented out entirely for now as requested */}
                  {/* isEditing ? (
                    <div className="flex flex-col items-center gap-2 w-full md:w-64">
                      {entry.image && entry.image !== "blank.jpg" && (
                        <div className="w-full aspect-video sm:aspect-square rounded-2xl overflow-hidden shadow-md border border-[#736E67]/10 relative flex items-center justify-center bg-[#FAF8F5] dark:bg-[#282522]/40 opacity-70">
                          {isImageFile(entry.image) ? (
                            <img
                              src={`${VITE_SERVER_IMAGE_URL}/images/${entry.image}`}
                              alt="Current Gratitude Moment"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <iframe
                              src={`${VITE_SERVER_IMAGE_URL}/images/${entry.image}`}
                              title="Current Gratitude Attachment"
                              className="w-full h-full border-none rounded-2xl"
                            />
                          )}
                        </div>
                      )}
                      <div className="w-full text-left">
                        <label className="text-[#736E67] text-[10px] font-semibold tracking-wider uppercase mb-1 block">
                          {entry.image && entry.image !== "blank.jpg" ? "Replace Attachment" : "Attach Photo/PDF"}
                        </label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => setEditFile(e.target.files[0])}
                          className="w-full text-xs text-[#736E67] font-light file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-[#7E8F7A]/10 file:text-[#7E8F7A] file:hover:bg-[#7E8F7A]/20 transition-all cursor-pointer"
                        />
                        {editFile && (
                          <p className="text-xs text-[#7E8F7A] mt-1">Selected: {editFile.name}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    entry.image && entry.image !== "blank.jpg" && (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-full md:w-64 aspect-video sm:aspect-square rounded-2xl overflow-hidden shadow-md border border-[#736E67]/10 relative flex items-center justify-center bg-[#FAF8F5] dark:bg-[#282522]/40">
                          {isImageFile(entry.image) ? (
                            <img
                              src={`${VITE_SERVER_IMAGE_URL}/images/${entry.image}`}
                              alt="Gratitude Moment"
                              onClick={() =>
                                setSelectedImage(`${VITE_SERVER_IMAGE_URL}/images/${entry.image}`)
                              }
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                            />
                          ) : (
                            <iframe
                              src={`${VITE_SERVER_IMAGE_URL}/images/${entry.image}`}
                              title="Gratitude Attachment"
                              className="w-full h-full border-none rounded-2xl"
                            />
                          )}
                        </div>
                        {!isImageFile(entry.image) && (
                          <a
                            href={`${VITE_SERVER_IMAGE_URL}/images/${entry.image}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-semibold text-[#7E8F7A] hover:text-[#2D2A26] dark:hover:text-[#FAF8F5] transition-colors uppercase tracking-wider inline-flex items-center gap-1 mt-1"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                            Open in New Tab
                          </a>
                        )}
                      </div>
                    )
                  )} */}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#736E67]/[0.06]">
                  {isEditing ? (
                    <>
                      <button
                        className="py-2.5 px-6 bg-[#7E8F7A] hover:bg-[#6B7D68] text-white text-xs font-semibold rounded-full transition duration-300 shadow-sm"
                        onClick={() => handleSave(entry)}
                      >
                        Save
                      </button>
                      <button
                        className="py-2.5 px-6 border border-[#736E67]/30 hover:bg-[#736E67]/[0.04] text-[#736E67] text-xs font-semibold rounded-full transition duration-300"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="py-2.5 px-6 border border-[#7E8F7A]/40 hover:bg-[#7E8F7A]/[0.04] text-[#7E8F7A] text-xs font-semibold rounded-full transition duration-300"
                        onClick={() => handleEditClick(entry)}
                      >
                        Edit Entry
                      </button>
                      <button
                        className="py-2.5 px-6 border border-[#D66B6B]/40 hover:bg-[#D66B6B]/[0.04] text-[#D66B6B] text-xs font-semibold rounded-full transition duration-300"
                        onClick={() => handleDeleteClick(date)}
                      >
                        Delete Entry
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Fullscreen light box */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[#2D2A26]/90 backdrop-blur-md z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={selectedImage}
              alt="Selected Memory"
              className="max-h-[90vh] max-w-full object-contain"
            />
          </div>
        </div>
      )}

      <ConfirmBox
        visible={confirmDelete}
        message="Are you sure you want to delete this memory?"
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default GratiDetails;
