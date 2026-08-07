import "../data-table.scss";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

export const TableTabs = ({ tabs, activeTab, onTabChange }: any) => {
  if (tabs.length === 0) return null;
  const activeLabel =
    tabs.find((t: any) => t.value === activeTab)?.label ?? tabs[0]?.label ?? "Select";
  return (
    <div className="table__tabs">
      <div className="table__tabs-buttons">
        {tabs.map((tab: any) => (
          <button
            key={tab.value}
            className={`table__tab ${tab.value === activeTab ? "active" : ""}`}
            onClick={() => onTabChange(tab.value)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Menu as="div" className="table__tabs-dropdown">
        <Menu.Button type="button" className="table__tabs-dropdown-trigger" aria-label="Select table tab">
          <span className="table__tabs-dropdown-label">{activeLabel}</span>
          <span className="table__tabs-dropdown-chevron" aria-hidden>
            ▼
          </span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="table__tabs-dropdown-menu">
            {tabs.map((tab: any) => (
              <Menu.Item key={tab.value}>
                {({ active }) => (
                  <button
                    type="button"
                    className={`table__tabs-dropdown-item ${tab.value === activeTab ? "active" : ""} ${
                      active ? "hovered" : ""
                    }`}
                    onClick={() => onTabChange(tab.value)}
                  >
                    {tab.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
