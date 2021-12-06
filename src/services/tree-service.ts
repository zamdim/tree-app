import { TreeArr } from "../types-common";

export default class TreeService {
  getData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.tree);
      }, 1000);
    });
  };

  tree: TreeArr = [
    {
      name: "guitars",
      id: "65dfg465",
      children: [
        {
          name: "acoustic",
          id: "65dfg4465",
          children: [
            { name: "Kremona", id: "sd45f45" },
            { name: "Epiphone", id: "dfg988t" },
            { name: "Gibson", id: "df4gd456" },
            { name: "Yamaha", id: "er6d5pklf45" },
          ],
        },
        {
          name: "electric",
          id: "d65fg4e",
          children: [
            {
              name: "Fender",
              id: "dfgdfg4645",
              children: [
                {
                  name: "Telecaster",
                  id: "s5d4f658",
                },
                {
                  name: "Stratocaster",
                  id: "dfklgp45",
                },
                {
                  name: "Jaguar",
                  id: "gdfg4655",
                },
              ],
            },
            {
              name: "Gibson",
              id: "fd65g85e",
              children: [
                {
                  name: "Les Paul",
                  id: "dfgkl66",
                },
                {
                  name: "SG",
                  id: "dlsfg45",
                },
                {
                  name: "ES-335",
                  id: "gdf45g5r",
                },
                {
                  name: "ES-339",
                  id: "g5er665",
                },
              ],
            },
          ],
        },
        { name: "acoustic bass", id: "glpe5r" },
        { name: "electric bass", id: "ger5633v" },
      ],
    },
  ];
}
