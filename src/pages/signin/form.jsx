import PropTypes from "prop-types";

import TextInputWithLabel from "../../components/TextInputWithLabel";
import SButton from "../../components/Button";

export default function Sform({ isLoading, handleSubmit }) {
  return (
    <form className="text-center">
      <TextInputWithLabel
        htmlFor="email-address"
        label="Email address"
        name="email"
        type="email"
        className="text-input mb-6"
        placeholder="Email address"
      />
      <TextInputWithLabel
        htmlFor="password"
        label="Password"
        name="password"
        type="password"
        className="text-input mb-6"
        placeholder="Password"
      />
      <SButton
        className="bg-blue-500 hover:bg-blue-600 px-5 py-2 text-center text-white rounded-lg"
        loading={isLoading}
        disabled={isLoading}
        action={handleSubmit}
      >
        Sign In
      </SButton>
    </form>
  );
}

Sform.propTypes = {
  isLoading: PropTypes.bool,
  handleSubmit: PropTypes.func,
};
