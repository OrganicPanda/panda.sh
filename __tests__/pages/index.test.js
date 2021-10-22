import React from "react";
import { mount } from "enzyme";
import IndexPage from "../../pages/index";

const useRouter = jest.spyOn(require("next/router"), "useRouter");
useRouter.mockImplementation(() => ({
  pathname: "/",
}));

describe("IndexPage", () => {
  let wrapper = null;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  it("renders IndexPage unchanged", () => {
    wrapper = mount(<IndexPage isLoading={false} />);

    expect(wrapper).toMatchSnapshot();
  });
});
