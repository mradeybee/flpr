import { render, screen } from "@/test/test-utils"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSubContent,
  MenubarSubTrigger,
} from "./menubar"
import userEvent from "@testing-library/user-event"

describe("Menubar", () => {
  it("renders a complete menubar with items", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Tab</MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    expect(screen.getByText("File")).toBeInTheDocument()
    expect(screen.queryByText("New Tab")).not.toBeVisible()
  })

  it("shows content when trigger is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Tab</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    await user.click(screen.getByText("File"))
    expect(screen.getByText("New Tab")).toBeVisible()
  })

  it("renders checkbox items with correct states", async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked>Show Toolbar</MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    await user.click(screen.getByText("View"))
    const checkbox = screen.getByText("Show Toolbar")
    expect(checkbox).toBeVisible()
    expect(checkbox.parentElement).toHaveAttribute("data-state", "checked")
  })

  it("renders radio group items with correct selection", async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Options</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="medium">
              <MenubarRadioItem value="small">Small</MenubarRadioItem>
              <MenubarRadioItem value="medium">Medium</MenubarRadioItem>
              <MenubarRadioItem value="large">Large</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    await user.click(screen.getByText("Options"))
    expect(screen.getByText("Medium").parentElement).toHaveAttribute("data-state", "checked")
  })

  it("renders submenu items correctly", async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarSubTrigger>Advanced</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Sub Item 1</MenubarItem>
              <MenubarItem>Sub Item 2</MenubarItem>
            </MenubarSubContent>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    await user.click(screen.getByText("Edit"))
    expect(screen.getByText("Advanced")).toBeVisible()
  })

  it("applies custom className to menubar", () => {
    render(
      <Menubar className="custom-class">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    )

    expect(screen.getByRole("menubar")).toHaveClass("custom-class")
  })

  it("applies animation classes when opening and closing", async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Tab</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    await user.click(screen.getByText("File"))
    const content = screen.getByText("New Tab").parentElement
    expect(content).toHaveClass("data-[state=open]:animate-in")
  })
}) 