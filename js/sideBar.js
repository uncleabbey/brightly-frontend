
const books = [

    {
        id: 1,
        title: "Grammer Practice",
        link: "https://res.cloudinary.com/komsic/image/upload/v1607085969/Group_88_lcyzfe.png",
    },

    {
        id: 2,
        title: "Literacy",
        link: "https://res.cloudinary.com/komsic/image/upload/v1607085969/Group_88_lcyzfe.png",
    },

    {
        id: 3,
        title: "French Language",
        link: "https://res.cloudinary.com/komsic/image/upload/v1607085969/Group_88_lcyzfe.png",
    },

    {
        id: 4,
        title: "Information Technology",
        link: "https://res.cloudinary.com/komsic/image/upload/v1607085969/Group_88_lcyzfe.png",
    },

    {
        id: 5,
        title: "Elementary science",
        link: "https://res.cloudinary.com/komsic/image/upload/v1607085969/Group_88_lcyzfe.png",
    },

    {
        id: 6,
        title: "Social Studies",
        link: "https://res.cloudinary.com/komsic/image/upload/v1607085969/Group_88_lcyzfe.png",
    }
]

const container = document.querySelector(".noteList")

books.map(book =>{
    const div = document.createElement("div");
    const img = document.createElement("img");
    const span = document.createElement("span");
    span.innerHTML = book.title
    img.src = book.link;
    div.append(img);
    div.append(span);
    container.append(div)
})


