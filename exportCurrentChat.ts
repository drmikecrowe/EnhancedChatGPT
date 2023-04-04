export function exportCurrentChat() {
  const blocks = [
    ...document.querySelector(".flex.flex-col.items-center")!.children,
  ];
  let markdown = blocks.map((block) => {
    let wrapper: HTMLElement | null = block.querySelector(".whitespace-pre-wrap");

    if (!wrapper) {
      return "";
    }

    // probably a user's, so..
    if (wrapper.children.length === 0) {
      return "**User:**\n" + wrapper.innerText;
    }

    // pass this point is assistant's
    wrapper = wrapper.firstChild as HTMLElement;

    return "**ChatGPT:**\n" + [...wrapper.children].map((node: any) => {
      switch (node.nodeName) {
        case "PRE":
          return `\`\`\`${
            node.getElementsByTagName("code")[0].classList[2].split("-")[1]
          }\n${node.innerText.replace(/^Copy code/g, "").trim()}\n\`\`\``;
        default:
          return `${node.innerHTML}`;
      }
    }).join("\n");
  });

  markdown = markdown.filter((b) => b);

  if (!markdown) {
    return false;
  }

  let signature = "";

  try {
    signature =
      `***\n###### _Exported by **${__NEXT_DATA__.props.pageProps.user.name}** on ${
        new Date().toLocaleString()
      }_`;
  } catch {}

  const blob = new Blob([markdown.join("\n\n***\n\n") + "\n\n\n" + signature], {
    type: "text/plain",
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "chatgpt-thread_" +
    (new Date().toLocaleString("en-US", { hour12: false }).replace(
      /[\s/:]/g,
      "-",
    ).replace(",", "")) + ".md";
  document.body.appendChild(a);
  a.click();
}
