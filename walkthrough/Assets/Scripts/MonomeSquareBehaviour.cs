using UnityEngine;
using System.Collections;

public class MonomeSquareBehaviour : MonoBehaviour {
	
	public int id;
	public int state = 0;
	private Color32[] colours = new Color32[4];
	private Color32 highlightColour = new Color32(200,200,200,255);
	
	// Use this for initialization
	void Start () {
		colours[0] = new Color32(100,100,100,255);
		colours[1] = new Color32(129,208,224,255);
		colours[2] = new Color32(129,208,224,255);
		colours[3] = new Color32(129,208,224,255);
	}
	
	// Update is called once per frame
	void Update () {
	}
	
	void Highlight () {
		if (state == 0) {
			renderer.material.color = highlightColour;
		}
	}
	
	void UnHighlight () {
		if (state == 0) {
			renderer.material.color = colours[0];
		}
	}
	
	void SetID (int myID) {
		id = myID;
	}
	
	void Activate (int s) {
		renderer.material.color = colours[s];
		state = s;
	}
	
	void Deactivate () {
		state = 0;
		renderer.material.color = colours[0];
	}
	
	void OnTriggerEnter (Collider col) {
		Debug.Log ("Standing on #" + id);
		Activate(1);
	}
	
	void OnTriggerExit (Collider col) {
		Deactivate();
	}
	
}
