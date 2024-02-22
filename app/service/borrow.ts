import { Datum } from "../model/BorrowModel";

export async function getBorrowData() {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}borrows`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status === 200) {
      const data = await resp.json();
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function createBorrow(data: Datum) {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}borrow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (resp.status === 200) {
      const data = await resp.json();
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}
export async function updateBorrow(bid: String, data: Datum) {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}borrow/${bid}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (resp.status === 200) {
      const data = await resp.json();
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function returnBorrow(data: Datum) {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}borrow/return`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (resp.status === 200) {
      const data = await resp.json();
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

// export async function returnBorrow(bid: String) {
//   try {
//     const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}borrow/return`, {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (resp.status === 200) {
//       const data = await resp.json();
//       return data;
//     } else {
//       return null;
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }
