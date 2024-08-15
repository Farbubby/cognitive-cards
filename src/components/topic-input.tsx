export default function TopicInput() {
  return (
    <>
      <div>
        <form className="flex flex-col gap-2">
          <label className="font-bold text-base">Pick a topic</label>
          <div className="flex flex-row gap-4">
            <input
              type="text"
              className="p-2 shadow-lg rounded-lg w-1/2"
              placeholder="Cells"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg">
              Submit
            </button>
          </div>
          <div className="text-gray-700 text-sm font-bold">
            Tip: Narrow your topic to get specific questions!
          </div>
        </form>
      </div>
    </>
  );
}
