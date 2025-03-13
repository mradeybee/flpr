import { render } from "@/test/test-utils"
import Loading from "./loading"

describe("Loading", () => {
  it("renders null", () => {
    const { container } = render(<Loading />)
    expect(container.firstChild).toBeNull()
  })
}) 