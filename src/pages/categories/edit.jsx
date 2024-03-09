import TextInputWithLabel from "../../components/TextInputWithLabel";
import SButton from "../../components/Button";

export default function Edit() {
  return (
    <main className="w-full m-auto p-5">
      {/* {alert.status && (
        <SAlert
          className="bg-red-100 text-red-600 px-5 py-2 rounded-lg"
          message={alert.message}
        />
      )} */}
      <form
        //   onSubmit={handleSubmit}
        className="text-center"
      >
        <TextInputWithLabel
          htmlFor="name"
          label="Nama Kategori"
          name="name"
          type="text"
          //   value={null}
          className="text-input mb-6"
          placeholder="Nama Kategori"
          //   onChange={handleChange}
        />
        <SButton
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-5 py-2 text-center text-white rounded-lg"
          //   loading={isLoading}
          //   disabled={isLoading}
        >
          Edit
        </SButton>
      </form>
    </main>
  );
}
