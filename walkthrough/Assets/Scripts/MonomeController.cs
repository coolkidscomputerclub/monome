using UnityEngine;
using System.Collections;

public class MonomeController : MonoBehaviour {
	
	public  float startTime; 
	public  int phase        = 0;
	private int amountRows   = 9;
	private int amountPerRow = 9;
	
	private Color32 baseColour  = new Color32(100,100,100,255);
	private Color32 activeColour = new Color32(129,208,224,255);
	
	// Use this for initialization
	void Start () {
		GameObject monomeSquare = (GameObject) Resources.Load("Square");
		int row = 0;
		while (row < amountRows) {
			for (int i=0; i < amountPerRow; i++) {
				Vector3 pos = new Vector3((-i*1.2f),0, row*1.2f);
				GameObject clone = Instantiate(monomeSquare, gameObject.transform.position + pos, Quaternion.identity) as GameObject;
				clone.transform.parent = gameObject.transform;
				clone.tag = "col" + (i+1);
				clone.renderer.material.color = baseColour;
			}
			row++;
		}
		startTime = Time.time;
	}
	
	// Update is called once per frame
	void Update () {
		float timePassed = Time.time - startTime;
		int prevCol = phase;
		if (phase == 0) {
			prevCol = 9;
		}
		if (timePassed >= 0.125f) {
			
			phase++;
			if (phase > 8) {
				phase = 0;
				prevCol = 8;
			}
			
			GameObject[] prevColumn = GameObject.FindGameObjectsWithTag("col"+(prevCol));
			foreach (GameObject square in prevColumn) {
				square.renderer.material.color = baseColour;
			}
			
			GameObject[] column = GameObject.FindGameObjectsWithTag("col"+(phase+1));
			foreach (GameObject square in column) {
				square.renderer.material.color = activeColour;
			}
			
		}

	}
}
