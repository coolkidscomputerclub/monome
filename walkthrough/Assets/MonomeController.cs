using UnityEngine;
using System.Collections;

public class MonomeController : MonoBehaviour {
	
	public int phase = 0;
	private int amountRows = 9;
	private int amountPerRow = 9;
	
	// Use this for initialization
	void Start () {
		GameObject monomeSquare = (GameObject) Resources.Load("Square");
		// monomeSquare.transform.parent = gameObject.transform;
		int row = 0;
		while (row < amountRows) {
			for (int i=0; i < amountPerRow; i++) {
				Vector3 pos = new Vector3((-i*1.2f),0, -row*1.2f);
				GameObject clone = Instantiate(monomeSquare, gameObject.transform.position + pos, Quaternion.identity) as GameObject;
				clone.transform.parent = gameObject.transform;
			}
			row++;
		}
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
