using UnityEngine;
using System.Collections;

public class MonomeController : MonoBehaviour {
	
	public  float startTime  = 0.0f; 
	public  float timePassed = 0.0f;
	public  int phase        = 0;
	public  int prev         = 8;
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
		timePassed += Time.deltaTime;
		if (timePassed >= 0.125f) {
			
			startTime = 0.0f;
			timePassed = 0.0f;
			prev = phase;
			phase++;
			if (phase > 8) {
				phase = 0;
				prev  = 8;
			}
			
			GameObject[] prevColumn = GameObject.FindGameObjectsWithTag("col"+(prev+1));
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
